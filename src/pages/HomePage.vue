<script setup>
import { computed, onMounted, ref } from 'vue';
import { paidService } from '../services/PaidService.js';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { loadState, saveState } from '../utils/Store.js';
import ProfileCard from '../components/ProfileCard.vue';
import PostCard from '../components/PostCard.vue';
import PaidCard from '../components/PaidCard.vue';
import { profileService } from '../services/ProfileService.js';

const posts = computed(()=> AppState.posts)
const theme = ref(loadState('theme') || 'light')
const paids = computed(()=> AppState.paids)

async function getPosts(){
  try {
    await postService.getPosts()
  } catch (error) {
    logger.log('unable to send getPost request to service', error)
    Pop.toast('Unable to see posts at the moment', 'error')
  }
}

async function getProfiles(){
    try {
      await profileService.getProfiles()
    } catch (error) {
      logger.log('Unable to get profiles from service', error)
      Pop.toast('Unable to get profiles, sorry!', 'error')
    }
  }

  async function getPaids(){
    try {
      await paidService.getPaids()
    } catch (error) {
      logger.log('unable to get paids to service', error)
      Pop.toast('Unable to get ads, sorry!', 'error')
    }
  }

  async function getPostsByPage(pageNum){
    try {
      await postService.getPostsByPage(pageNum)
      logger.log('appstate current page is ', AppState.currentPage)
    } catch (error) {
      logger.log('unable to get posts for page', error)
      Pop.toast('Unable to get pages on requested page', error)
    }
  }

function themeSwitch(){
  document.documentElement.setAttribute('data-bs-theme', theme.value)
}

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

  onMounted(()=>{
    themeSwitch()
    getPosts()
    getProfiles()
    getPaids()
  })

</script>

<template>
  <section class="row">
    <div class="col-2 text-center p-2">
      <ProfileCard/>
      <button class="btn text-light" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i class="mdi text-success fs-1" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
          </button>
    </div>
    <div class="col-8">
      <div class="row p-2" v-for="post in posts" :key="post.id">
        <PostCard :post="post"/>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <button v-if="AppState.currentPage>1" class="btn btn-primary" @click="getPostsByPage(AppState.currentPage-1)">newer</button>
        <button v-else class="btn btn-primary" disabled>newer</button>
        <h5 class="p-4">Page {{ AppState.currentPage }}</h5>
        <button v-if="AppState.currentPage < AppState.totalPages" class="btn btn-primary" @click="getPostsByPage(AppState.currentPage+1)">older</button>
        <button v-else class="btn btn-primary" disabled>older</button>
      </div>
    </div>
    <div class="col-2">
      <div>
        <div v-for="paid in paids" :key="paid.title">
        <PaidCard :paid="paid"/>
      </div> 
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.hide{
  display: none;
}
</style>
