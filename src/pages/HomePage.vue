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

  async function getPaids(){
    try {
      await paidService.getPaids()
    } catch (error) {
      logger.log('unable to get paids to service', error)
      Pop.toast('Unable to get ads, sorry!', 'error')
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
    getPaids()
  })

</script>

<template>
  <section class="row">
    <div class="col-2 flex-column justify-content-center p-2">
      <ProfileCard/>
      <button class="btn text-light" @click="toggleTheme"
            :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
            <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
          </button>
    </div>
    <div class="col-8">
      <div class="row p-2" v-for="post in posts" :key="post.id">
        <PostCard :post="post"/>
      </div>
    </div>
    <div class="col-2">
      <div class="hide">
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
