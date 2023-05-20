<template>
	<div>
		<div>
			<h1>What is this website?</h1>
			<p>This is a website that shows the Organization of the US Military, and prices and stockpiles of weapons, ammo etc.</p>
			<p>Data is taken from procurement reports on the DoD
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
svg {
	width: 100px;
}

div {
	text-align: center;
}

.icon-showcase {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
}

.icon-showcase svg {
	margin-top: -5px;
}

.icon-showcase p {
	font-style: italic;
}

a {
	color: var(--c-red)
}
</style>