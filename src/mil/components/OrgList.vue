<template>
	<div class="organization-list">
		<div v-for="child in getChildren(organization)">
      <div class="organization-child">
          <OrgIcon
            :type-tags="getTypeTags(child.type)"
            :size-string="getSizeString(child.size)"
            @click="canClick(child) ? $router.push($router.currentRoute.value.path + '/' + child.i) : ''"
            :link="canClick(child)"
          />
      </div>

			<div v-if="child.children && detailed" v-for="subChild in getChildren(child)" class="organization-sub-child" >
            <OrgIcon
                :type-tags="getTypeTags(subChild.type)"
                :size-string="getSizeString(subChild.size)"
                @click="canClick(subChild) ? $router.push($router.currentRoute.value.path  + '/' + child.i + '/' + subChild.i) : ''"
                :link="canClick(subChild)"
            />
			</div>
		</div>

	</div>
</template>

<script lang="ts" setup>
import OrgIcon from "@/mil/components/OrgIcon.vue";
import {getTypeTags, getSizeString, getChildren} from "@/mil/shared";
import {defineProps} from "vue";


defineProps<{
	organization: object | undefined,
  detailed?: boolean,
}>()


const canClick = (organization: any) : boolean => organization.children !== undefined

</script>

<style scoped>

.organization-list {
  display: grid;
  grid-gap: 16px;
  padding: 16px;
  grid-template-columns: repeat(auto-fit,100px);
  grid-auto-flow: column;
  grid-auto-columns: 100px;
  overflow-x: auto;
  justify-content: safe center;

}
.organization-list,  .organization-list>*{
  transform:rotateX(180deg);
}
.organization-child {
  height: 100px;
}
.organization-sub-child {
	height: 70px;
}
</style>