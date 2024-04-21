<script setup>
import { ref } from 'vue';
import { Post } from '../models/Post.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postService } from '../services/PostService.js';

const postData = ref({
    body: '',
    imgUrl: '',
})

async function postPost(){
    try {
        logger.log('making your post', postData)
        await postService.postPosts(postData.value) 
        postData.value = {
    body: '',
    imgUrl: '',
}
    } catch (error) {
        logger.log('unable to post post', error)
        Pop.toast('Unable to post right now', error)
    }
}

defineProps({post: Post})
</script>


<template>
<div class="bg-light text-dark shadow p-3">
    <form @submit.prevent="postPost">
        <label class="form-label" for="postBody">What do you want to share?</label>
        <input v-model="postData.body" type="text-area" name="body" class="form-control text-secondary" id="postBody" maxlength="5000" required>

        <label class="form-label" for="postImg">Image URL:</label>
        <input v-model="postData.imgUrl" type="url" name="imgUrl" class="form-control mb-2 text-secondary" id="postImg" maxlength="500">
        <button type="submit" class="btn btn-success"><small>POST</small></button>
    </form>
</div>
</template>


<style lang="scss" scoped>

</style>