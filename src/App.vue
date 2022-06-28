<template>
	<nav>
		<router-link :to="{name: 'home'}">Main</router-link>
		<router-link :to="{name: 'projects'}">Projects</router-link>
		<router-link :to="{name: 'products'}">Products</router-link>
	</nav>
	<div id="page">
		<RouterView/>
	</div>
</template>

<script lang="ts" setup>

import {RouterView} from 'vue-router'</script>

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
