<script setup>
  import {computed, onMounted, ref} from 'vue';
  import {profileService} from '../services/ProfileService.js';
  import {logger} from '../utils/Logger.js';
  import Pop from '../utils/Pop.js';
  import {AppState} from '../AppState.js';
  import {loadState,saveState} from '../utils/Store.js';
  import PaidCard from '../components/PaidCard.vue';
  import {useRoute} from 'vue-router';
  import {postService} from '../services/PostService.js';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
import ProfileHeader from '../components/ProfileHeader.vue';
import ProfileSideBar from '../components/ProfileSideBar.vue';

  const theme = ref(loadState('theme') || 'light')
  const activeProfile = computed(() => AppState.activeProfile)
  const route = useRoute()
  const posts = computed(() => AppState.activeProfilePosts)
  const paids = computed(() => AppState.paids)
  
  async function findProfile() {
    try {
      await profileService.findProfile(route.params.profileId)
    } catch (error) {
      logger.log('Unable to get profiles from service', error)
      Pop.toast('Unable to get profiles, sorry!', 'error')
    }
  }

  async function getActiveProfilePosts() {
    try {
      await postService.getActiveProfilePosts(route.params.profileId)
    } catch (error) {
      logger.log('unable to find user posts', error)
      Pop.toast('Unable to load posts for this profile', 'error')
    }
  }
  async function getPostsByPage(pageNum) {
    try {
      await postService.getPostsByPage(pageNum)
      logger.log('appstate current page is ', AppState.currentPage)
    } catch (error) {
      logger.log('unable to get posts for page', error)
      Pop.toast('Unable to get pages on requested page', error)
    }
  }

  function themeSwitch() {
    document.documentElement.setAttribute('data-bs-theme', theme.value)
  }

  function toggleTheme() {
    theme.value = theme.value == 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', theme.value)
    saveState('theme', theme.value)
  }

  onMounted(() => {
    findProfile()
    getActiveProfilePosts()
    themeSwitch()
  })
</script>

<template>
  <div class="component" v-if="activeProfile">

    <section class="row">
      <div class="col-2 flex-column justify-content-center p-2">
        <ProfileSideBar/>
        <button class="btn text-success fs-1" @click="toggleTheme"
          :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
          <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
        </button>
      </div>
      <div class="col-8">
        <ProfileHeader/>
        <div v-if="AppState.account" class="row p-2">
          <PostForm/>
        </div>
        <div v-else class="text-center p-3">
          <h2 class="fs-4 text-success">Login to post</h2>
        </div>

        <div class="row p-2" v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
        <div class="d-flex justify-content-center align-items-center">
          <button v-if="AppState.currentPage>1" class="btn btn-primary"
            @click="getPostsByPage(AppState.currentPage-1)">newer</button>
          <button v-else class="btn btn-primary" disabled>newer</button>
          <h5 class="p-4">Page {{ AppState.currentPage }}</h5>
          <button v-if="AppState.currentPage < AppState.totalPages" class="btn btn-primary"
            @click="getPostsByPage(AppState.currentPage+1)">older</button>
          <button v-else class="btn btn-primary" disabled>older</button>
        </div>
      </div>
      <div class="col-2">
        <div v-for="paid in paids" :key="paid.title">
          <PaidCard :paid="paid"/>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="col-8">
    <p class="text-emphasis">Search above to see content or access the homepage via the logo in the corner.</p>
  </div>
  <FormModal/>
</template>

<style lang="scss" scoped>

</style>