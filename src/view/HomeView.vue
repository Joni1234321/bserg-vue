<template>
	<AppTitle header="BSERG.COM" sub-header="by jonas vendelbo hansen"/>
	<div class="categories">
		<category title="Demo"
		          url-name="mil">
			<p>Organization WWII</p>
		</category>
		<category title="Projects"
		          url-name="projects">
			<div>
				<p>Ongoing</p>
				<p>Finished</p>
				<p>Archived</p>
			</div>
		</category>
	</div>
</template>

<script lang="ts" setup>
import Category from "@/components/Category.vue";
import AppTitle from "@/components/AppTitle.vue";</script>

<style scoped>

</style>