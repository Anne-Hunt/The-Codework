<script setup>
import { Paid } from '../models/Paid.js';


defineProps({paid: Paid})
</script>


<template>
<div>
    <a :href="paid.linkUrl">
        <img :src="paid.tall" :alt="paid.title">
    </a>
</div>
</template>


<style lang="scss" scoped>

</style>