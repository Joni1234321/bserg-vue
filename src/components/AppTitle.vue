<template>
  <div class="title">
    <h1>{{ header }}</h1>
    <p v-if="subHeader !== undefined"> {{ subHeader }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  header: string,
  subHeader?: string,
}>()
</script>

<style scoped>
.title{
  padding-left: 5em;
  font-size: 1em;
  margin-bottom: 3em;
}
.title>h1 {
  font-weight: bold;
  font-size: 6em;
}
.title>p {
  display: inline;
  font-style: italic;
  position: relative;
  top: -2em;
  left: 4em;
}
</style>