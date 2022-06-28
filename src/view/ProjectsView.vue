<template>
	<AppTitle header="PROJECTS"/>
	<div>
		<category title="Ongoing">
			<div class="cards">
				<Card v-for="card in cards"
				      :title="card.title"
				      :description="card.description"
				      :date="card.date"
				      @click="this.$router.push('/card/' + card.id)"
				/>
			</div>
		</category>
		<category title="Finished">

		</category>
		<category title="Archived">
			<div class="cards">
				<Card title="BSERG (ASP.NET)"/>
			</div>
		</category>
	</div>
</template>

<script lang="ts" setup>

import AppTitle from "@/components/AppTitle.vue";
import Category from "@/components/Category.vue";
import Card from "@/components/Card.vue";
import CardModel from "@/models/card"

const cards = [
	new CardModel(0, "BSERG (Vue)", "My own personal website, now created in VueJS", "2020-02"),
	new CardModel(1, "Vaskemaskine"),
	new CardModel(2, "Spotify Queue Device"),
	new CardModel(1, "Vaskemaskine"),
	new CardModel(1, "Vaskemaskine"),
]
</script>

<style scoped>

.cards {
	display: grid;
	justify-content: space-around;
	grid-template-columns: repeat(auto-fit, 300px);
	gap: 30px;
}
</style>