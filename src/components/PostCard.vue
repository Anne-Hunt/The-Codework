<script setup>
import { Post } from '../models/Post.js';


defineProps ({post: Post})
</script>


<template>
<div>
    <div class="bg-light text-dark shadow post p-3">
        <div class="inline w-25">
            <img :src="post.creator.picture" :alt="post.creator.picture" class="profilePic inline-block">
        </div>
        <div class="inline">
            <p class="inline name">{{ post.creator.name }}</p>
        </div>
        <span>{{ post.createdAt }}</span>
        <span>{{ post.updatedAt }}</span>
        <div class="row overflow">
            <p>{{ post.body }}</p>
            <p>{{ post.LikeCount }}</p><i class="mdi mdi-heart"></i>
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