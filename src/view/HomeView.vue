<template>
	<AppTitle header="BSERG.COM" sub-header="by jonas vendelbo hansen"/>
	<div class="categories">
		<category title="Highlights"
		          url-name="highlights">
			<p>Active Projects</p>
			<p>Recent Projects</p>
			<p>Recent Products</p>
		</category>
		<category title="Projects"
		          url-name="projects">
			<div>
				<p>Ongoing</p>
				<p>Finished</p>
				<p>Archived</p>
			</div>
		</category>
		<category title="Products"
		          url-name="products">
			<p>Finished</p>
			<p>To Do</p>
		</category>
	</div>
</template>

<script lang="ts" setup>
import Category from "@/components/Category.vue";
import AppTitle from "@/components/AppTitle.vue";
</script>

<style scoped>

</style>