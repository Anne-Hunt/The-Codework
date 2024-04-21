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
<div>
    <div class="bg-light text-dark shadow post p-3">
        <img :src="activeProfile.coverImg" :alt="activeProfile.name">
          <div>
            <img :src="activeProfile.picture" :alt="activeProfile.name">
          </div>
          <h2>{{ activeProfile.name }}</h2>
    </div>
    
</div>
</template>


<style lang="scss" scoped>

.overflow{
    overflow: hidden;
}

.post{
    height: 40dvh;
}

.profilePic{
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
}

.name{
    font-weight: bold;
}

</style>