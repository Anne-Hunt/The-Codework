<script setup>
import { Account } from '../models/Account.js';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


defineProps (
    {post: Post, profile: Profile, account: Account}
)

async function trashPost(postId){
    try {
        const confirmTrash = await Pop.confirm('Do you really want to delete this post?')
        if (!confirmTrash) return
        logger.log('confirmed trash post', postId)
        await postService.trashPost(postId)
    } catch (error) {
        logger.log('trashing failed', error, postId)
        Pop.toast('unable to delete this post', 'error')
    }
}

async function likePost(postId){
    try {
        await postService.likePost(postId)
    } catch (error) {
        logger.log('liking/unliking post', error)
        Pop.toast('Unable to perform like action', 'error')
    }
}
</script>


<template>
<div>
    <div class="bg-light text-dark shadow post p-3">
        <div class="inline w-25">
            <RouterLink :to="{name: 'Profile', params: {profileId: post.creator.id}}" class="selectable">
                <img :src="post.creator.picture" :alt="post.creator.picture" class="profilePic inline-block">
            </RouterLink>
        </div>
        <div class="inline">
            <p class="inline name">{{ post.creator.name }}</p>
        </div>
        <span>{{ post.createdAt }}</span>
        <div class="row overflow">
            <img :src="post.imgUrl" alt="Image!">
            <p>{{ post.body }}</p>
            <p>{{ post.LikeCount }}</p><i class="mdi mdi-heart" @click="likePost(post.id)"></i>
            <i v-if="post.creator.id == account?.id" class="mdi mdi-trash-can" @click="trashPost(post.id)"></i>
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