<script setup>
import { ref, computed } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import { postService } from '../services/PostService.js';
import { profileService } from '../services/ProfileService.js';
import Pop from '../utils/Pop.js';
import { RouterLink } from 'vue-router';


const searchQuery = ref('')
const searchTerms = computed(()=> AppState.searchTerms)

async function search(){
    try {
        logger.log('sending query to services, plural', searchQuery.value)
        await postService.searchPosts(searchQuery.value)
        await profileService.searchProfiles(searchQuery.value)
        searchQuery.value = ''
    } catch (error) {
        logger.log('Search failed', error)
        Pop.toast('Search failed', 'error')
    }
}

async function clearingSearch(){
    try {
        await postService.clearingSearch()
        searchQuery.value = ''
    } catch (error) {
        logger.log('unable to clear search', error)
        Pop.toast('Unable to clear search', 'error')
    }
}

</script>


<template>
    <section class="row">
        <div class="col-1">
            <RouterLink :to="'/'">
                <i class="mdi mdi-cog-outline text-success fs-1 p-2 fontfix"></i>
            </RouterLink>
        </div>
            <div class="col-11 p-2">
                <form @submit.prevent="search()">
                <div class="input-group">
                    <input v-model="searchQuery" type="text" class="form-control" placeholder="search posts and profiles" id="searchInput">
                    <button class="btn btn-success" type="submit"><small>FIND</small></button>
                </div>
                </form>
                <div v-if="searchTerms" class="mt-2"><div @click="clearingSearch" role="button" class="btn btn-success clicky" title="clear search results">{{ searchTerms }}</div>
                </div>
            </div>
    </section>
</template> 


<style lang="scss" scoped>
.clicky{
    cursor: pointer;
}

.fontfix{
  text-shadow: 1px 1px 2px black;
}
</style>