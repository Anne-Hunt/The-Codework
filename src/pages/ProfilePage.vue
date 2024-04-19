<script setup>
import { computed, onMounted, ref } from 'vue';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { loadState, saveState } from '../utils/Store.js';
import PaidCard from '../components/PaidCard.vue';
import { useRoute } from 'vue-router';
import { postService } from '../services/PostService.js';
import PostCard from '../components/PostCard.vue';

const theme = ref(loadState('theme') || 'light')
const activeProfile = computed(()=> AppState.activeProfile)
const route = useRoute()
const posts = computed(()=> AppState.activeProfilePosts)

async function findProfile(){
    try {
      const creatorId = route.params.id
      await profileService.findProfile(creatorId)
    } catch (error) {
      logger.log('Unable to get profiles from service', error)
      Pop.toast('Unable to get profiles, sorry!', 'error')
    }
  }

  async function getActiveProfilePosts(){
    try {
      const idSearch = route.params.id
      await postService.getActiveProfilePosts(idSearch)
    } catch (error) {
      logger.log('unable to find user posts', error)
      Pop.toast('Unable to load posts for this profile', 'error')
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

  onMounted(()=> {
    findProfile()
    getActiveProfilePosts()
    themeSwitch()
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
      <img :src="activeProfile.coverImg" :alt="activeProfile.name">
      <div>
        <img :src="activeProfile.picture" :alt="activeProfile.name">
      </div>
      <h2>{{ activeProfile.name }}</h2>

      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post"/>
      </div>

    </div>
    <div class="col-2">
<PaidCard/>
    </div>
    </section>
</template>


<style lang="scss" scoped>

</style>