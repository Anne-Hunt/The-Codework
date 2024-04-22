<script setup>
import { computed, onMounted } from 'vue';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

const profile = computed(()=> AppState.loggedInProfile)

async function identifyUser(){
    try {
        await profileService.findUserProfile()
    } catch (error) {
        logger.log('trying to find you', error)
        Pop.toast('unable to identify you', 'error')
    }
}

onMounted(()=>{
    // identifyUser()
})
</script>

<template>
<div class="p-2">
    <Login />
</div>
<!-- <div v-if="AppState.account">
                    <a :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a>
                    <a :href="profile.github"><i class="mdi mdi-github"></i></a>
                    <a :href="profile.resume"><i class="mdi mdi-file-account"></i></a>  
                </div> -->
</template>


<style lang="scss" scoped>

</style>