<script setup>
import { computed, onMounted, ref } from 'vue';
import { paidService } from '../services/PaidService.js';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { loadState, saveState } from '../utils/Store.js';
import ProfileCard from '../components/ProfileSideBar.vue/index.js';
import PostCard from '../components/PostCard.vue';
import PaidCard from '../components/PaidCard.vue';
import PostForm from '../components/PostForm.vue';
// import { profileService } from '../services/ProfileService.js';

const posts = computed(()=> AppState.postResults)
const theme = ref(loadState('theme') || 'light')
const paids = computed(()=> AppState.paids)
const profiles = computed(()=> AppState.profileResults)


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
      <div class="row p-3">
        <PostForm/>
      </div>
      <div class="row p-2" v-for="post in posts" :key="post.id">
        <PostCard :post="post"/>
      </div>
      <div class="row p-2" v-for="profile in profiles" :key="profile.id">
        <ProfileCard :profile="profile"/>
      </div>
      <!-- <div class="d-flex justify-content-center align-items-center">
        <button v-if="AppState.currentPage>1" class="btn btn-primary" @click="getPostsByPage(AppState.currentPage-1)">newer</button>
        <button v-else class="btn btn-primary" disabled>newer</button>
        <h5 class="p-4">Page {{ AppState.currentPage }}</h5>
        <button v-if="AppState.currentPage < AppState.totalPages" class="btn btn-primary" @click="getPostsByPage(AppState.currentPage+1)">older</button>
        <button v-else class="btn btn-primary" disabled>older</button>
      </div> -->
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
