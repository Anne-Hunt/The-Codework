<script setup>
  import {
    computed
  } from 'vue'
  import {
    AppState
  } from '../AppState'
  import {
    AuthService
  } from '../services/AuthService'
// import { profileService } from '../services/ProfileService.js';

  const user = computed(() => AppState.user)
  const account = computed(() => AppState.account)
  async function login() {
    AuthService.loginWithPopup()
  }
  async function logout() {
    AuthService.logout({
      returnTo: window.location.origin
    })
  }

  // function setFormModal(formType){
  //   profileService.setFormModal(formType)
  // }

//   function resetFormType(){
//     profileService.resetFormType()
// }
</script>

<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user?.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="border-0 selectable no-select" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account?.picture || user?.picture" class="d-flex justify-content-center">
            <img :src="account?.picture || user?.picture" alt="account photo" height="70" class="rounded-pill shadow" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-sm-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <!-- <div class="list-group-item dropdown-item list-group-item-action selectable" data-bs-toggle="modal" data-bs-target="#formModal" @click="setFormModal('user')">
                Edit Profile
            </div> -->
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<style lang="scss" scoped></style>