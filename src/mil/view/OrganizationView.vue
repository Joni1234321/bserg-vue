<template>
	<div v-if="organization" class="organization-view" style="">
    <div class="detailed-input">
      <label for="detailed-input"> DETAILED </label>
      <input name="detailed-input" type="checkbox" v-model="detailed">
    </div>
    <div>
      <OrgList :organization="organization" class="organization-list" :detailed="detailed"/>
    </div>
	</div>
</template>

<script lang="ts" setup>
import OrgList from "@/mil/components/OrgList.vue";
import {ref} from "vue";

const detailed = ref(false)
defineProps<{
  organization: any | undefined
}>()

</script>

<style scoped>
.detailed-input {
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}
.detailed-input>* {
  font-size: 1.5em;
  font-weight: bold;
}
input {
  width: 1em;
  height: 1em;
}
label {
  writing-mode:vertical-rl;
  text-align: center;
}


</style>