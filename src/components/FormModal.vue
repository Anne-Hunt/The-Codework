<script setup>
import PostEditForm from './PostEditForm.vue';

</script>

<template>
<div>
    <div class="modal fade" id="formModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <PostEditForm/>
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