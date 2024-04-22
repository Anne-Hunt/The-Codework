<script setup>
import { Profile } from '../models/Profile.js';

defineProps (
    {profile: Profile}
)
</script>


<template>
<div>
    <div class="bg-light text-dark shadow post p-3">
        <div class="row justify-content-center">
            <div class="col">
                <RouterLink :to="{name: 'Profile', params: {profileId: profile.id}}" class="selectable">
                    <img :src="profile.picture" :alt="profile.name" class="profilePic inline-block">
                </RouterLink>
            </div>
            <div class="col">
                <a :href="profile.linkedin"><i class="mdi mdi-linkedin fs-2"></i></a>
                <a :href="profile.github"><i class="mdi mdi-github fs-2"></i></a>
                <a :href="profile.resume"><i class="mdi mdi-file-account fs-2"></i></a>
                <h2>{{ profile.name }}, class of {{ profile.class }} <span v-if="profile.graduated != true"><i class="mdi mdi-pencil-circle fs-2"></i></span><span v-else><i class="mdi mdi-account-school fs-2"></i></span></h2>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>

.overflow{
    overflow: hidden;
}

.post{
    max-height: 40dvh;
}

.profilePic{
    height: 150px;
    width: 150px;
    object-fit: cover;
    object-position: center;
}

.name{
    font-weight: bold;
}

</style>