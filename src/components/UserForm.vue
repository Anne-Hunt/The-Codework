<script setup>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
// import { AppState } from '../AppState.js';
import { Modal } from 'bootstrap';

const updateData = ref({
    email: '',
    name: '',
    picture: '',
    bio: '',
    coverImg: '',
    github: '',
    linkedin: '',
    resume: '',
    class: '',
    graduated: Boolean
})

// const profile = computed(()=> AppState.activeProfile)

async function updateProfile(updateData){
    try {
        await accountService.updateProfile(updateData)

        updateData.value = {
            email: '',
    name: '',
    picture: '',
    bio: '',
    coverImg: '',
    github: '',
    linkedin: '',
    resume: '',
    class: '',
    graduated: Boolean
        }

        Modal.getOrCreateInstance('#profileFormModal').hide()
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
<input v-model="updateData.email" type="email" name="email" class="form-control" id="updateEmail" maxLength="500">

<label class="form-label" for="updateName"></label>
<input v-model="updateData.name" type="text" name="name" class="form-control" id="updateName" maxlength="100">

<label class="form-label" for="updatePicture"></label>
<input v-model="updateData.picture" type="url" name="picture" class="form-control" id="updatePicture" maxlength="500">

<label class="form-label" for="updateBio"></label>
<input v-model="updateData.bio" type="text-area" name="bio" class="form-control" id="updateBio" maxlength="1000">

<label class="form-label" for="updateCoverImg"></label>
<input v-model="updateData.coverImg" type="url" name="coverImg" class="form-control" id="updateCoverImg" maxlength="500">

<label class="form-label" for="updateGithub"></label>
<input v-model="updateData.github" type="url" name="github" class="form-control" id="updateGithub" maxlength="500">

<label class="form-label" for="updatedLinkedin"></label>
<input v-model="updateData.linkedin" type="url" name="linkedin" class="form-control" id="updateLinkedin" maxlength="500">

<label class="form-label" for="updateResume"></label>
<input v-model="updateData.resume" type="url" name="resume" class="form-control" id="updateResume" maxlength="500">

<label class="form-label" for="updateGraduation"></label>
<input v-model="updateData.graduated" type="checkbox" name="graduated" class="form-control" id="updateGraduation" unchecked>

<label class="form-label" for="updateClass"></label>
<input v-model="updateData.class" type="text" name="class" class="form-control" id="updateClass" maxlength="100">

<button type="submit" class="btn btn-primary">Submit Changes</button>
    </form>
</div>
</template>


<style lang="scss" scoped>

</style>