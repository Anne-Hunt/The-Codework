<script setup>
import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { Modal } from 'bootstrap';
import { DateTime } from "luxon"

const account = computed(()=>AppState.account)

defineProps (
    {post: Post, profile: Profile}
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

async function openModal(postId){
    try {
        await postService.setActivePost(postId)
        Modal.getOrCreateInstance('#formModal').show(postId)
    } catch (error) {
        Pop.toast('Unable to open post form', 'error')
        logger.log('bad post modal', error)
    }
}

</script>


<template>
    <div class="p-2">

        <div class="bg-light text-dark shadow post p-3">
            <div class="row justify-content-between">
                <div class="col">
                    <RouterLink :to="{name: 'Profile', params: {profileId: post.creator.id}}" class="selectable">
                        <img :src="post.creator.picture" :alt="post.creator.picture" class="profilePic inline-block">
                    </RouterLink>
                    <span class="name">{{ post.creator.name }}</span>
                    <div>
                        <span>{{ post.creator.class }} </span><span v-if="post.creator.graduated != true"><i class="mdi mdi-pencil-circle"></i></span><span v-else><i class="mdi mdi-account-school"></i></span>
                        <p><a :href="post.creator.linkedin"><i class="mdi mdi-linkedin"></i></a><a :href="post.creator.github"><i class="mdi mdi-github"></i></a><a :href="post.creator.resume"><i class="mdi mdi-file-account"></i></a> </p>
                    </div>
                </div>
                <div class="col">
                    <p class="name">{{ post.DateFix }}</p>
                    <div class="col">
                    </div>
                </div>
                <div class="col">
                    <div v-if="post.creator.id == account?.id" class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></button>
                        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="postDropdown">
                            <div class="list-group">
                                <div class="list-group-item dropdown-item list-group-item-action selectable"
                                data-bs-target="#formModal" @click="openModal(post.id)"><i class="mdi mdi-pen"></i> Edit
                                Post
                            </div>
                            <div class="list-group-item dropdown-item list-group-item-action" @click="trashPost(post.id)"><i
                                class="mdi mdi-trash-can"></i> Delete Post
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <img class="postImg" :src="post.imgUrl" alt="Image!">
            </div>
            <div class="col">
                <p>{{ post.body }}</p>
            </div>
            <div>
                <span><i class="mdi mdi-heart" @click="likePost(post.id)"></i> {{ post.LikeCount }}</span>
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
    max-height: 50dvh;
}

.postImg{
    max-height: 200px;
    object-fit: scale-down;
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