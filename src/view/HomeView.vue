<template>
	<AppTitle header="BSERG.COM" sub-header="by jonas vendelbo hansen"/>
	<div class="categories">
		<category title="Demo"
		          url-name="mil">
			<p>Organization WWII</p>
			<p>Extracted data from niehorster.org</p>
			<p>Most interesting is USSR 1944 rifle division</p>
			<p>NATO symbols are in svg format, created in hand by me</p>
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