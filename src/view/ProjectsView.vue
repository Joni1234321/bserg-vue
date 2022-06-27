<template>
  <AppTitle header="PROJECTS"/>
  <div>
    <category title="Ongoing">
      <div class="cards">
        <Card title="BSERG (Vue)"
              description="My own personal website, now created in VueJS"/>
        <Card title="Vaskemaskine"/>
        <Card title="Spotify Queue Device"/>
        <Card title="Vintønde"/>
        <Card title="Vintønde"/>
        <Card title="Vintønde"/>
      </div>
    </category>
    <category title="Finished">

    </category>
    <category title="Archived">
      <div class="cards">
        <Card title="BSERG (ASP.NET)"/>
      </div>
    </category>
  </div>
</template>

<script lang="ts" setup>

import AppTitle from "@/components/AppTitle.vue";
import Category from "@/components/Category.vue";
import Card from "@/components/Card.vue";
</script>

<style scoped>

.cards {
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 30px;

}
</style>