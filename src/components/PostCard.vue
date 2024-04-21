<script setup>
import { Modal } from 'bootstrap';
import { Account } from '../models/Account.js';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { ref } from 'vue';


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

const postData = ref({
    body: '',
    imgUrl: '',
    id:''
})


async function updatePost(){
    try {
        const postId = post.id
        logger.log('making your post', postData)
        await postService.updatePost(postId, postData.value) 
    } catch (error) {
        logger.log('unable to update post', error)
        Pop.toast('Unable to update post right now', error)
    }
}
</script>


<template>
    <div>
        <div class="bg-light text-dark shadow post p-3">
            <div class="inline w-25">
                <div>
                    <RouterLink :to="{name: 'Profile', params: {profileId: post.creator.id}}" class="selectable">
                        <img :src="post.creator.picture" :alt="post.creator.picture" class="profilePic inline-block">
                    </RouterLink>
                </div>
<!-- <v-if="post.creator.id == account?.id" > -->
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="mdi mdi-dots-horizontal"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editPostForm"><i
                                    class="mdi mdi-pen"></i> Edit Post</a></li>
                        <li><a class="dropdown-item" href="#" @click="trashPost(post.id)"><i
                                    class="mdi mdi-trash-can"></i>
                                Delete Post</a></li>
                    </ul>
                </div>
            </div>
            <div class="inline">
                <p class="inline name">{{ post.creator.name }}</p>
            </div>
            <span>{{ post.createdAt }}</span>
            <div class="row overflow">
                <img class="postImg" :src="post.imgUrl" alt="Image!">
                <p>{{ post.body }}</p>
                <span><i class="mdi mdi-heart" @click="likePost(post.id)"></i> {{ post.LikeCount }}</span>

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

.postImg{
    max-height: 100px;
    object-fit: cover;
    object-position: center;
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