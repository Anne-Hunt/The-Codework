<script setup>
import { computed } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { AppState } from '../AppState.js';


const profile = computed(()=> AppState.activeProfile)

async function updateProfile(){
    try {
        await accountService.updateProfile()
    } catch (error) {
        logger.log('updating profile failed', error)
        Pop.toast('Unable to update profile', 'error')
    }
}
</script>


<template>
<div>
    <form @submit.prevent="updateProfile">
<label class="form-label" for="updateEmail"></label>
<input type="email" name="email" class="form-control" id="updateEmail" maxLength="500">

<label class="form-label" for="updateName"></label>
<input type="text" name="name" class="form-control" id="updateName" maxlength="100">

<label class="form-label" for="updatePicture"></label>
<input type="url" name="picture" class="form-control" id="updatePicture" maxlength="500">

<label class="form-label" for="updateBio"></label>
<input type="text-area" name="bio" class="form-control" id="updateBio" maxlength="1000">

<label class="form-label" for="updateCoverImg"></label>
<input type="url" name="coverImg" class="form-control" id="updateCoverImg" maxlength="500">

<label class="form-label" for="updateGithub"></label>
<input type="url" name="github" class="form-control" id="updateGithub" maxlength="500">

<label class="form-label" for="updatedLinkedin"></label>
<input type="url" name="linkedin" class="form-control" id="updateLinkedin" maxlength="500">

<label class="form-label" for="updateResume"></label>
<input type="url" name="resume" class="form-control" id="updateResume" maxlength="500">

<label class="form-label" for="updateGraduation"></label>
<input type="checkbox" name="graduated" class="form-control" id="updateGraduation" unchecked>

<label class="form-label" for="updateClass"></label>
<input type="text" name="class" class="form-control" id="updateClass" maxlength="100">

<button type="submit" class="btn btn-primary">Submit Changes</button>
    </form>
</div>
</template>


<style lang="scss" scoped>

</style>