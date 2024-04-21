<script setup>
// import { computed } from 'vue';
// import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
// import { AppState } from '../AppState.js';

// const profile = computed(()=> AppState.profileResults)
defineProps (
    {profile: Profile}
)
</script>


<template>
<div>
    <div class="bg-light text-dark shadow post p-3">
        <div class="inline w-25">
            <RouterLink :to="{name: 'Profile', params: {profileId: profile.id}}" class="selectable">
                <img :src="profile.picture" :alt="profile.name" class="profilePic inline-block">
            </RouterLink>
        </div>
        <div>
            <a :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a>
            <a :href="profile.github"><i class="mdi mdi-github"></i></a>
            <a :href="profile.resume"><i class="mdi mdi-file-account"></i></a>
        </div>
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