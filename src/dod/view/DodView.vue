<template>
	<div class="main">
		<div class="top-bar">
			<router-link class="home-link" :to="{name:'dod'}">DoD Collection</router-link>
			<div class="links">
				<router-link :to="{name: 'dod.help'}">help</router-link>
			</div>
		</div>
		<RouterView/>
	</div>
</template>

<script lang="ts" setup>
import Category from "@/components/Category.vue";
import AppTitle from "@/components/AppTitle.vue";
import ProjectCard from "@/components/Projects/ProjectCard.vue";
import ProjectCardPure from "@/components/Projects/ProjectCardPure.vue";
</script>

<style scoped>
.top-bar {
	font-size: 1em;
	margin-bottom: 1em;
}
.top-bar *{
	color: black;
}
.home-link {
	display: block;
	font-size: 2em;
	font-weight: bold;
	text-align: center;
}
.links {
	font-size: 1.2em;
	position: absolute;
    right: 1em;
	top: .25em;
}
.links>* {
	padding: 0 .3em;
	background-color: #eee;
	box-shadow: #aaa 1px 2px 1px;
	margin: 0 1em;
}
.links>*:hover {
	opacity: .8;
}
</style>