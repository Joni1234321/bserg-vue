<template>
	<link rel="preconnect" :href="backend.url">
	<nav>
		<router-link :to="{name: 'home'}">bserg</router-link>
		<router-link :to="{name: 'projects'}">projects</router-link>
		<router-link v-if="false" :to="{name: 'products'}">Products</router-link>
		<router-link :to="{name: 'mil'}">demo</router-link>
	</nav>
	<div id="page">
		<RouterView/>
	</div>
</template>

<script lang="ts" setup>

import {RouterView} from 'vue-router'
import backend from "@/backend";

</script>

<style>
@import './assets/base.css';

nav {
	padding-left: 50px;
	font-size: 26px;
	background-color: var(--c-red);
}

nav > a {
	font-weight: bold;
	color: white;
	padding: 0 .4em;
	text-align: center;
}

a {
	text-decoration: none;
	transition: 0.4s;
}

a:hover {
	background-color: hsl(0, 0%, 10%, 0.4);
	border-radius: 3px;
}
</style>
