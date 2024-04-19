<script setup>
import SearchBar from './components/SearchBar.vue';

// import { AppState } from './AppState'
// import Navbar from './components/Navbar.vue'


</script>

<template>
  <header class="bg-primary p-2">
    <SearchBar/>
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made by Raccoon Synthesizer
  </footer>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
