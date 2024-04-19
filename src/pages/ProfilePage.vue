<script setup>
import { computed, onMounted } from 'vue';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';


const profiles = computed(()=> AppState.profiles)
const profile = computed(()=> AppState.activeProfile)

async function getProfiles(){
    try {
      await profileService.getProfiles()
    } catch (error) {
      logger.log('Unable to get profiles from service', error)
      Pop.toast('Unable to get profiles, sorry!', 'error')
    }
  }

  onMounted(()=> {
    getProfiles()
  })
</script>


<template>
<div>
    
</div>
</template>


<style lang="scss" scoped>

</style>