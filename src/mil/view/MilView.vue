<template>
	<div class="main">
		<div class="top-bar">
		<router-link :to="{name:'mil'}"><h1>demo</h1></router-link>
		<div class="links">
			<router-link :to="{name: 'mil.help'}">demo info</router-link>
		</div>
		</div>
		<RouterView/>
	</div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.top-bar {
	font-size: .8em;
	margin-bottom: 1em;
}
h1 {
	font-weight: bold;
	text-align: center;
}
.links {
	font-size: 1.5em;
	position: absolute;
	right: 1em;
	top: .25em;
}
.links>* {
	padding: 0 .3em;
	background-color: #eee;
	box-shadow: #aaa 1px 2px 1px;
}
.links>*:hover {
	opacity: .8;
}
</style>