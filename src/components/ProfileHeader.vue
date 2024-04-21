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
            <!-- <img class="zindex" :src="activeProfile.coverImg" :alt="activeProfile.name"> -->
            <img :src="activeProfile.coverImg" alt="" style="z-index: 0;">
            <div class="fluffy-holder" style="z-index: 1;">
                <div class="bg-light text-dark shadow fluffy-offset">
                      <div class="fluffy-card">
                        <img id="profilePic" :src="activeProfile.picture" class="rounded-circle border border-light border-5 shadow" :alt="activeProfile.name" style="z-index: 7;">
                        <h2>{{ activeProfile.name }}, class of {{ activeProfile.class }} <span v-if="activeProfile.graduated != true"><i class="mdi mdi-pencil-circle"></i></span><span v-else><i class="mdi mdi-account-school"></i></span></h2>
                      </div>
                </div>
                <div>
                    <a :href="activeProfile.linkedin"><i class="mdi mdi-linkedin"></i></a>
                    <a :href="activeProfile.github"><i class="mdi mdi-github"></i></a>
                    <a :href="activeProfile.resume"><i class="mdi mdi-file-account"></i></a>  
                </div>
                
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>

.img-hero {
    min-height: 65dvh;
    background-size: cover;
    background-position: center;
    width: 100%;
    // background-image: url(`activeProfile.coverImg`);
}

.profilePic{
    max-height: 50px;
    max-width: 50px;
    object-fit:scale-down;
    object-position: center;
}

.name{
    font-weight: bold;
}

.fluffy-card {
    position: absolute;
    bottom: -50dvh;
    left: 25dvh;
}

.fluffy-offset {
    margin-bottom: 5dvh;
}

.fluffy-holder {
    padding: 0;
    min-height: -10dvh;
    position: absolute;
    width: 100%;
}

</style>