<script setup>

</script>


<template>
  <div class="modal fade" id="editPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="editPostLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editPostLabel">Edit Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <PostEditForm/>
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