<script setup>
import { computed, onMounted } from 'vue';
import { paidService } from '../services/PaidService.js';
import { postService } from '../services/PostService.js';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const posts = computed(()=> AppState.posts)

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
      Pop.toast('Unable to load ads, sorry!', 'error')
    }
  }

  onMounted(()=>{
    getPaids()
    getPosts()
  })

</script>

<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    {{ posts }}
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
