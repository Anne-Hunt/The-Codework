<script setup>
import { computed } from 'vue';
import { Account } from '../models/Account.js';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
import { postService } from '../services/PostService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import { Modal } from 'bootstrap';
import { profileService } from '../services/ProfileService.js';

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

function setFormModal(formType){
    profileService.setFormModal(formType)
  }

// function resetFormType(){
//     profileService.resetFormType()
// }

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
      <div v-if="post.creator.id == account?.id" class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false"><i class="mdi mdi-dots-horizontal"></i></button>
          <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="postDropdown">
              <div class="list-group">
                  <div class="list-group-item dropdown-item list-group-item-action selectable" data-bs-toggle="modal"
                      data-bs-target="#formModal" @click="setFormModal('post')"><i class="mdi mdi-pen"></i> Edit Post
                  </div>
                  <div class="list-group-item dropdown-item list-group-item-action" @click="trashPost(post.id)"><i
                          class="mdi mdi-trash-can"></i> Delete Post
                  </div>
              </div>
          </div>
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