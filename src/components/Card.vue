<template>
  <div class="card">
      <h1 class="title">{{ title }}</h1>
      <p class="description"> {{ description }}</p>
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  title: string,
  description?: string,
}>()

</script>

<style scoped>
.title {
  font-size: 1.5em;
  font-weight: bold;
  color: black;
  text-align: center;
  border-bottom: 7px solid hsl(100,100%, 30%);
}
.card {
  padding: 0 1em 1em 1em;
  border-radius: 4px;
  border: 3px solid black;
}




</style>