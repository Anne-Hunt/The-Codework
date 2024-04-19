<script setup>
import { postService } from '../services/PostService.js';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';



async function getPosts(){
  try {
    await postService.getPosts()
  } catch (error) {
    logger.log('unable to send getPost request to service', error)
    Pop.toast('Unable to see posts at the moment', 'error')
  }

  async function getProfiles(){
    try {
      await profileService.getProfiles()
    } catch (error) {
      logger.log('Unable to get profiles from service', error)
      Pop.toast('Unable to get profiles, sorry!', 'error')
    }
  }
}
</script>

<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="home-card p-5 card align-items-center shadow rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
        class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div>
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
</style>
