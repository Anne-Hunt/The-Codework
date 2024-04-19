<script setup>

</script>


<template>
<div>
    <form @submit.prevent>
<label class="form-label" for="updateEmail"></label>
<input type="email" name="email" class="form-control" id="updateEmail">

<label class="form-label" for="updateName"></label>
<input type="text" name="name" class="form-control" id="updateName">

<label class="form-label" for="updatePicture"></label>
<input type="url" name="picture" class="form-control" id="updatePicture">

<label class="form-label" for="updateBio"></label>
<input type="text-area" name="bio" class="form-control" id="updateBio">

<label class="form-label" for="updateCoverImg"></label>
<input type="url" name="coverImg" class="form-control" id="updateCoverImg">

<label class="form-label" for="updateGithub"></label>
<input type="url" name="github" class="form-control" id="updateGithub">

<label class="form-label" for="updatedLinkedin"></label>
<input type="url" name="linkedin" class="form-control" id="updateLinkedin">

<label class="form-label" for="updateResume"></label>
<input type="url" name="resume" class="form-control" id="updateResume">

<label class="form-label" for="updateGraduation"></label>
<input type="checkbox" name="graduated" class="form-control" id="updateGraduation" unchecked>

<label class="form-label" for="updateClass"></label>
<input type="text" name="class" class="form-control" id="updateClass">

<button type="submit" class="btn btn-primary">Submit Changes</button>
    </form>
</div>
</template>


<style lang="scss" scoped>

</style>