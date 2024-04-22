<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import UserForm from '../components/UserForm.vue';

const account = computed(() => AppState.account)

</script>

<template>
  <div class="row about text-center justify-content-center p-3">
    <div class="col-4 p-2">

      <div v-if="account">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
        </div>
        <div v-else>
          <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
        </div>
    </div>
      <div class="col-8 p-2">
        <h2>Update Your Profile</h2>
        <UserForm/>
      </div>
    </div>

</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
