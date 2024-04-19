<script setup>
import { Paid } from '../models/Paid.js';


defineProps({paid: Paid})
</script>


<template>
<div class="py-2 shadow">
    <a :href="paid.linkUrl">
        <img :src="paid.tall" :alt="paid.title" class="adly">
    </a>
</div>
</template>


<style lang="scss" scoped>
.adly{
    max-width: 100%;
}

</style>