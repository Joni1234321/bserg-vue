<template>
	<svg :class="{link: link}" height="100%" viewBox="0 0 200 170" width="100%">
		<g transform="translate(25 40)">
			<text v-if="sizeString" style="font-size:26px;letter-spacing:5px" systemLanguage="en" x="77.5" y="-5">
				{{ sizeString }}
			</text>

			<rect id="border" :class="{shadow: link}" height="100" width="150"/>
			<path v-if="types.isInfantry" d="M 0 0 L 150 100 M 0 100 L 150 0"/>
			<path
				v-if="types.isArmor"
				d="
				M 50 25 a 20 25 0 1 0 0 50 l 50 0
				M 100 75 a 20 25 0 1 0 0 -50 l -50 0
			"/>
			<g v-if="types.isCar">
				<circle cx="55" cy="87.5" r="5"/>
				<circle cx="75" cy="87.5" r="5"/>
				<circle cx="95" cy="87.5" r="5"/>
			</g>
			<circle v-if="types.isArtillery || types.isAntiTank" cx="75" cy="50" fill="black" r="6"/>
			<path v-if="types.isAntiTank" d="M 0 0 L 75 100 L 150 0"/>
			<path v-if="types.isAntiAir" d="M 0 100 L 75 0 L 150 100 M 37.5 50 l 75 0"/>
			<path v-if="types.isReconnaissance" d="M 0 100 L 150 0"/>
			<polygon v-if="types.isCavalry" points="0,100 150,100 150,0" fill="black"/>
			<g v-if="types.isMortar">
				<circle cx="75" cy="65" fill="black" r="7"/>
				<path d="M 75 65 l 0 -40 l 10 10 m -10 -10 l -10 10"/>
			</g>

			<!-- SUPPORT -->
			<polygon v-if="types.isObserver" points="75,20 105,70 45,70"/>
			<path v-if="types.isSignal" d="M 0 0 l 75 70 L 75 30 L 150 100"/>
			<g v-if="types.isEngineer">
				<rect x="30" y="30" width="90" height="40" style="fill: white; stroke: white"/>
				<path v-if="types.isEngineer" d="M 35 70 l 0 -35 l 80 0 l 0 35 m -40 -35 l 0 25"/>
			</g>
			<path v-if="types.isMedical"
			      d="M 0 50 L 150 50 M 75 0 L 75 100 M 30 40 l 0 20 M 120 40 l 0 20 M 65 20 l 20 0 M 65 80 l 20 0"/>
			<g v-if="types.isTransport">
				<circle cx="75" cy="50" r="25"/>
				<path d="M 50 50 l 50 0 M 75 25 l 0 50 M 57.5 32.5 l 35 35 M 57.5 67.5 l 35 -35"/>
			</g>
			<g v-if="types.isChemical">
				<path d="M 65 75 A 55 50 0 0 1 105 30 M 45 30 A 55 50 0 0 1 85 75"/>
				<circle r="5" cx="105" cy="30" fill="black"/>
				<circle r="5" cx="45" cy="30" fill="black"/>
			</g>
			<rect v-if="types.isSupply || types.isService" fill="black" height="15" width="150" x="0" y="85"/>

			<path v-if="types.isAmmunition" d="M 50 75 l 50 0 m -10 -35 a 15 15 0 1 0 -30 0 l 0 35 m 30 0 l 0 -35"/>
			<path v-if="types.isMaintenance" :transform="getMaintenanceTransform(types)"
			      d="M 50 50 l 50 0 l 15 15 m 0 -30 l -15 15 m -50 0 l -15 15 m 0 -30 l 15 15"/>
			<path v-if="types.isFuel" d="M 75 75 l 0 -25 l -20 -20 l 40 0 l -20 20"/>

			<rect v-if="types.isHeadquarters" fill="black" height="15" width="150" x="0" y="0"/>
			<!-- MODIFIERS -->
			<circle v-if="types.isSemiMotorized || types.isMotorized" cx="75" cy="110" r="5"/>
			<g v-if="types.isMotorized">
				<circle cx="55" cy="110" r="5"/>
				<circle cx="95" cy="110" r="5"/>
			</g>

			<rect v-if="types.isMedium || types.isHeavy" width="20" height="100" stroke-width="4" :fill="types.isHeavy ? 'black' : 'transparent' "/>

			<text style="font-size:30px" x="75" y="60"> {{ types.centerText }}</text>
			<text style="font-size:15px" x="75" y="90"> {{ types.bottomText }}</text>
			<text style="font-size:15px" x="75" y="25"> {{ types.topText }}</text>
			<text style="font-size:10px; text-anchor: end;" x="145" y="25"> {{ types.cornerText }}</text>

			<text :style="{fill:types.isCavalry ? 'white' : 'red'}" x="75" y="95"> {{ types.notes }}</text>
		</g>
	</svg>
</template>

<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps<{
	typeTags: string[],
	sizeString?: string,
	link?: boolean,
}>()

interface TagsType {
	notes: string,

	[key: string]: boolean | string,
}

const topTextTags = ["wire", "radio"]

function getTypes(tags: string[]): any {
	const out: TagsType = {notes: ""}

	for (let i = 0; i < tags.length; i++) {
		const tag = tags[i].toLowerCase()
		if (tag === "infantry") out.isInfantry = true
		else if (tag === "armor" || tag === "armored") out.isArmor = true
		else if (tag === "car") out.isCar = true
		else if (tag === "artillery" || tag === "howitzer") out.isArtillery = true
		else if (tag === "anti-tank") out.isAntiTank = true
		else if (tag === "anti-air") out.isAntiAir = true
		else if (tag === "reconnaissance") out.isReconnaissance = true
		else if (tag === "cavalry") out.isCavalry = true
		else if (tag === "self-propelled gun") {
			out.isArmor = true;
			out.isArtillery = true
		} else if (tag === "infantry gun") {
			out.isInfantry = true;
			out.isArtillery = true
		} else if (tag === "mortar") {
			out.isMortar = true
		}

		// SUPPORT
		else if (tag === "observer") out.isObserver = true

		else if (tag === "signal") out.isSignal = true
		else if (tag === "telephone") out.bottomText = tag

		else if (tag === "engineer" || tag === "pioneer") out.isEngineer = true

		else if (tag === "medical") out.isMedical = true
		else if (tag === "hospital") return {isMedical: true, cornerText: tags.join(" ")}
		else if (tag === "ambulance") {
			out.isMedical = true;
			out.cornerText = tag
		} else if (tag === "transport") out.isTransport = true
		else if (tag === "baker") out.centerText = "Baker"
		else if (tag === "veterinary") out.centerText = "V"
		else if (tag === "chemical") out.isChemical = true
		else if (tag === "supply") out.isSupply = true
		else if (tag === "service") {
			out.isService = true;
			out.centerText = "service"
		} else if (tag === "ammunition") out.isAmmunition = true
		else if (tag === "maintenance") out.isMaintenance = true
		else if (tag === "fuel") out.isFuel = true

		else if (tag === "headquarters")
			return {isHeadquarters: true, notes: tags.slice(0, tags.indexOf("headquarters")).join(" ")}
			//return {isHeadquarters: true}
			//out.isHeadquarters = true
		// WEAPONS
		else if (tag === "machine gun") {
			out.bottomText = "MG"
			if (tags.length === 1) return {isInfantry: true, bottomText: "MG"}
		}
		else if (tag === "sub-machine gun") {
			out.isInfantry = true;
			out.topText = "SMG"
		} else if (tag === "anti-tank-rifle") {
			out.isAntiTank = true;
			out.topText = "ATR"
		}
		// MODIFIERS
		else if (tag === "motorized") out.isMotorized = true
		else if (tag === "semi-motorized") out.isSemiMotorized = true
		else if (tag === "medium") out.isMedium = true
		else if (tag === "heavy") out.isHeavy = true

		// TEXT MESSAGES THAT DOESNT BELONG IN NOTES
		else if (topTextTags.includes(tag)) out.topText = tag

		// ELSE
		else out.notes += tag + " "
	}
	return out
}

function getMaintenanceTransform(types: any) {
	if (types.isAmmunition) return "translate(0 25)"
	if (types.isSignal) return "scale(0.8 0.8) translate(20 -25)"
	return ""
}

const types = computed(() => getTypes(props.typeTags))


</script>

<style scoped>

#border {
	stroke-width: 5px;
}

svg {
	fill: transparent;
	stroke: black;
	stroke-width: 3px;
}

text {
	font-size: 12px;
	text-align: center;
	text-anchor: middle;
	fill: black;
	stroke-width: .3px;
}

.shadow {
	filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, 1));
}

.link:hover {
	filter: invert(0.5);
	cursor: pointer;
}
</style>