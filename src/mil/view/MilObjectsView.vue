<template>
  <div class="mil-view">
    <div
      v-for="org in orgs"
      @click="router.push('/mil/' + org._id.$oid)"
      class="mil-object"
    >
      <h2>{{ org.country }}</h2>
      <h2>{{ org.year }}</h2>
      <h2>{{ org.name }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import backend from "@/backend";
import {onMounted, provide, ref} from "vue";
import type {Ref} from "vue";
import router from "@/index";


const orgs : Ref<any[]> = ref([])
const loading : Ref<boolean> = ref(false)

onMounted(() => loadOrganizations())

function loadOrganizations() {
	loading.value = true
	backend.getOrganizations().then(r => {
		orgs.value = r
		loading.value = false
	})
}

</script>

<style scoped>

.mil-view>* {
	font-size: 1em;
	padding: 1em 2em;
	margin: 10px 0;
	cursor: pointer;
}

.mil-object {
  background-color: #ecf0f3;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
}
</style>