<script setup>
import { computed, ref } from 'vue';
import { Post } from '../models/Post.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postService } from '../services/PostService.js';
import { AppState } from '../AppState.js';
import { Modal } from 'bootstrap';

defineProps({post: Post}) 

const postData = ref({
    body: '',
    imgUrl: '',
})

const postId = computed(()=> AppState.formType)

async function updatePost(postId){
    try {
        logger.log('making your post', postData, postId)
        await postService.updatePost(postId, postData.value)
        Modal.getOrCreateInstance('#formModal').hide()
    } catch (error) {
        logger.log('unable to update post', error)
        Pop.toast('Unable to update post right now', error)
    }
}
</script>


<template>
    <div>
        <form @submit.prevent="updatePost(postId)">
            <label class="form-label" for="postBody">Update Your Post</label>
            <input v-model="postData.body" type="text-area" name="body" class="form-control text-secondary"
                id="postBody" maxlength="5000" required>

            <label class="form-label" for="postImg">Image URL:</label>
            <input v-model="postData.imgUrl" type="url" name="imgUrl" class="form-control mb-2 text-secondary"
                id="postImg" maxlength="500">
            <button type="submit" class="btn btn-success"><small>SUBMIT</small></button>
        </form>
    </div>
</template>


<style lang="scss" scoped>

</style>