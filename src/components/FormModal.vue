<script setup>
import { computed, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import { Profile } from '../models/Profile.js';
import PostEditForm from './PostEditForm.vue';
import UserForm from './UserForm.vue';
import { AppState } from '../AppState.js';
import { profileService } from '../services/ProfileService.js';

// const formModal = document.getElementById('formModal')
const formType = computed(()=> AppState.formType)

function resetFormType(){
    profileService.resetFormType()
}

defineProps({
  post: Post, profile: Profile
})

// function getForm(formType){
//   if (formType == `${}`)
//   formType 
//   if (formModal) {

//     formModal.addEventListener('show.bs.modal', event => {
//       // Button that triggered the modal
//       const button = event.relatedTarget
//       // Extract info from data-bs-* attributes
//       const form = button.getAttribute('data-bs-whatever')
//       // If necessary, you could initiate an Ajax request here
//       // and then do the updating in a callback.
  
//       // Update the modal's content.
//       const modalBodyInput = formModal.querySelector('.modal-body')
  
//       modalTitle.textContent = `New message to ${recipient}`
//       modalBodyInput.value = form
//     })
//   }
// }

// onMounted(()=>{getForm()})
</script>

<template>
<div>
    <div class="modal fade" id="formModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetFormType"></button>
      </div>
      <div class="modal-body">
        <div v-if="AppState.formType == 'post'">
          <PostEditForm/>
        </div>
        <div v-else-if="AppState.formType == 'user'">
          <UserForm/>
        </div>
      </div>
      <div class="modal-footer">
        <p>Changes cannot be undone!</p>
      </div>
    </div>
  </div>
</div>
</div>
</template>


<style lang="scss" scoped>

</style>