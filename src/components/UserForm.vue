<script setup>
import { computed, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import { AppState } from '../AppState.js';

const account = computed(()=> AppState.account)

const updateData  = ref({
    email: '',
    name: '',
    picture: '',
    bio: '',
    coverImg: '',
    github: '',
    linkedin: '',
    resume: '',
    class: '',
    graduated: Boolean,
})

async function updateProfile(updateData){
    try {
        await accountService.updateProfile(updateData)
        // await profileService.updateProfile(AppState.account.id, updateData.value)
        Pop.toast('Successfully updated!', 'success')
    } catch (error) {
        logger.log('updating profile failed', error)
        Pop.toast('Unable to update profile', 'error')
    }
}

</script>


<template>
<div>
    <form @submit.prevent="updateProfile(account.id)" class="text-light">
        <div class="d-flex">
            <div class="form-floating mb-3 w-50 p-1">
                <input v-model="updateData.email" type="email" name="email" class="form-control" id="updateEmail"
                    maxLength="500">
                <label class="form-label" for="updateEmail">Email</label>
            </div>
            <div class="form-floating mb-3 w-50 p-1">
                <input v-model="updateData.name" type="text" name="name" class="form-control" id="updateName"
                    maxlength="100">
                <label class="form-label" for="updateName">Name</label>
            </div>
        </div>
        <div class="d-flex">
            <div class="form-floating mb-3 w-50 p-1">
                <input v-model="updateData.picture" type="url" name="picture" class="form-control" id="updatePicture" maxlength="500">
                <label class="form-label" for="updatePicture">Picture</label>
            </div>
            <div class="form-floating mb-3 w-50 p-1">
                <input v-model="updateData.coverImg" type="url" name="coverImg" class="form-control" id="updateCoverImg" maxlength="500">
                <label class="form-label" for="updateCoverImg">Cover Image</label>
            </div>
        </div>


<div class="form-floating mb-3">
            
    <input v-model="updateData.bio" type="text-area" name="bio" class="form-control" id="updateBio" maxlength="1000">
    <label class="form-label" for="updateBio">Bio</label>
        </div>

    <div class="d-flex justify-content-between">
        <div class="form-floating mb-3 w-25">
            <input v-model="updateData.github" type="url" name="github" class="form-control" id="updateGithub"
                maxlength="500">
            <label class="form-label" for="updateGithub">Github</label>
        </div>
        <div class="form-floating mb-3 w-25">
            <input v-model="updateData.linkedin" type="url" name="linkedin" class="form-control" id="updateLinkedin"
                maxlength="500">
            <label class="form-label" for="updatedLinkedin">LinkedIn</label>
        </div>
        <div class="form-floating mb-3 w-25">
            <input v-model="updateData.resume" type="url" name="resume" class="form-control" id="updateResume"
                maxlength="500">
            <label class="form-label" for="updateResume">Resume</label>
        </div>
    </div>
    <div class="d-flex align-items-center justify-content-between">
        <div class="mb-3 p-1">   
            <input v-model="updateData.graduated" type="checkbox" name="graduated" class="form-check-input" id="updateGraduation" unchecked>
        <label class="form-check-label p-1" for="updateGraduation">Graduated</label>
            </div>
        <div class="form-floating mb-3 w-75">
        <input v-model="updateData.class" type="text" name="class" class="form-control" id="updateClass" maxlength="100">
        <label class="form-label" for="updateClass">Codeworks Class</label>
            </div>
    </div>

<button type="submit" class="btn btn-primary">Submit Changes</button>
    </form>
</div>
</template>


<style lang="scss" scoped>

</style>