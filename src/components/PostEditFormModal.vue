<script setup>
import { ref } from 'vue';
import { Post } from '../models/Post.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postService } from '../services/PostService.js';

defineProps({post: Post}) 
const postData = ref({
    body: '',
    imgUrl: '',
})

async function updatePost(){
    try {
        // const postId = post.id
        logger.log('making your post', postData)
        // await postService.updatePost(postId, postData.value) 
    } catch (error) {
        logger.log('unable to update post', error)
        Pop.toast('Unable to update post right now', error)
    }
}
</script>


<template>
  <div class="modal fade" id="editPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropPostLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropPostLabel">Edit Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updatePost">
            <label class="form-label" for="postBody">Update Your Post</label>
            <input v-model="postData.body" type="text-area" name="body" class="form-control text-secondary"
              id="postBody" maxlength="5000" required>

            <label class="form-label" for="postImg">Image URL:</label>
            <input v-model="postData.imgUrl" type="url" name="imgUrl" class="form-control mb-2 text-secondary"
              id="postImg" maxlength="500">
            <button type="submit" class="btn btn-success"><small>SUBMIT</small></button>
          </form>
        </div>
        <div class="modal-footer">
          Changes cannot be undone!
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>