<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';

const activeProfile = computed(()=> AppState.activeProfile)

defineProps (
    {post: Post, profile: Profile}
)

</script>


<template>
    <section class="container-flex">
        <div class="row">
            <img :src="activeProfile.coverImg" :alt="activeProfile.name" class="img-hero">
        <div class="row p-2">
            <div class="col">
                <img :src="activeProfile.picture" class="profilePic rounded-circle border border-light border-3 shadow" :alt="activeProfile.name">
            </div>
            <div class="col">
                <a :href="activeProfile.linkedin"><i class="mdi mdi-linkedin"></i></a>
                <a :href="activeProfile.github"><i class="mdi mdi-github"></i></a>
                <a :href="activeProfile.resume"><i class="mdi mdi-file-account"></i></a>  

                <h2>{{ activeProfile.name }}, class of {{ activeProfile.class }} <span v-if="activeProfile.graduated != true"><i class="mdi mdi-pencil-circle"></i></span><span v-else><i class="mdi mdi-account-school"></i></span></h2>
            </div>

        </div>

                </div>
                
    </section>
</template>


<style lang="scss" scoped>

.img-hero {
    max-height: 40dvh;
    object-fit: cover;
    object-position: center;
    width: 100%;
    // background-image: url(`activeProfile.coverImg`);
}

.profilePic{
    height: 100px;
    width: 100px;
    object-fit:scale-down;
    object-position: center;
}

.name{
    font-weight: bold;
}

</style>