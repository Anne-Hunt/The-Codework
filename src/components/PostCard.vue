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

        <div class="bg-light text-dark shadow">
            <div class="row justify-content-between align-items-center p-2">
                <div class="col">
                    <RouterLink :to="{name: 'Profile', params: {profileId: post.creator.id}}" class="selectable">
                        <img :src="post.creator.picture" :alt="post.creator.picture" class="profilePic inline-block rounded-circle border border-primary pe-1">
                    </RouterLink>
                    <span class="name p-1">{{ post.creator.name }}</span>
                </div>
                <div class="col">
                    <div class="text-end">
                        <span>{{ post.creator.class }} </span><span v-if="post.creator.graduated != true"><i class="mdi mdi-pencil-circle fs-2"></i><a :href="post.creator.linkedin"><i class="mdi mdi-linkedin fs-2"></i></a><a :href="post.creator.github"><i class="mdi mdi-github fs-2"></i></a><a :href="post.creator.resume"><i class="mdi mdi-file-account fs-2"></i></a></span><span v-else><i class="mdi mdi-account-school fs-2"></i><a :href="post.creator.linkedin"><i class="mdi mdi-linkedin fs-2"></i></a><a :href="post.creator.github"><i class="mdi mdi-github fs-2"></i></a><a :href="post.creator.resume"><i class="mdi mdi-file-account fs-2"></i></a></span>
                        
                    </div>
                </div>
                <div class="row justify-content-between m-0">
                    <div class="col-4">
                        <p><small>{{ post.updatedAt }}</small></p>
                    </div>
                    
                    <div class="col-2 text-end px-0">
                        <div v-if="post.creator.id == account?.id" class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown"
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
        </div>
        <div class="row p-0 m-0">
                    
            <img class="img-fluid postImg p-0 m-0" :src="post.imgUrl" alt="Image!">
        </div>
        <div class="row p-1">
                <p>{{ post.body }}</p>
            <div>
                <div class="row text-end">
                    <span><i class="mdi mdi-heart fs-2 text-danger" @click="likePost(post.id)"></i> {{ post.LikeCount }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>

.overflow{
    overflow-y: scroll;
}

.post{
    max-height: 60dvh;
    display: block;
}

.postImg{
    max-height: 100dvh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.postBody{
    max-height: 200px;
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