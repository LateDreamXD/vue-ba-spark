<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import BASpark from '../src/BASpark.vue';
import type { Options } from '../src/types';

const color = ref('rgb(45,175,255)');
const updateKey = ref(0);

const opts = reactive<Record<string, any> & Options>({
	color: '45,175,255',
	scale: 1.5,
	opacity: 1,
	speed: 1,
	maxTrail: 16,
	alwaysTrail: false,
	showFPS: true
});

const itemMap: Record<string, {
	type: string;
	min?: number;
	max?: number;
	step?: number;
}> = {
	// color: 'color',
	scale: { type: 'slider', min: 0.1, max: 2, step: 0.1 },
	opacity: { type: 'slider', min: 0.1, max: 1, step: 0.1 },
	speed: { type: 'slider', min: 0.5, max: 2, step: 0.1 },
	maxTrail: { type: 'number', min: 1, max: 64, step: 1 },
	alwaysTrail: { type: 'checkbox' },
	showFPS: { type: 'checkbox' },
}

const updateColor = (newVal: string) => {
	newVal.replace('#', '');
	const matchs = {
		r: newVal.slice(1, 3),
		g: newVal.slice(3, 5),
		b: newVal.slice(5, 7),
	}
	if(matchs.r && matchs.g && matchs.b) {
		const rgbc = [parseInt(matchs.r, 16), parseInt(matchs.g, 16), parseInt(matchs.b, 16)];
		opts.color = rgbc.join(',');
		console.log('new color:', opts.color);
	}
}

onMounted(() => {
	watch(opts, (newVal) => {
		updateKey.value++;
	});
});
</script>

<template>
	<main class="markdown-body">
		<img class="background" src="https://assets.latedream.qzz.io/images/background.webp" alt="" draggable="false" />
		<div class="contorl-panel">
			<label class="contorl-item">
				<span>color</span>
				<input v-model="color" type="color" @change="updateColor(color)" />
			</label>
			<label v-for="(item, id) in itemMap" :key="id" class="contorl-item">
				<span>{{ id }}</span>
				<input v-model="opts[id]" :type="item.type" :min="item?.min" :max="item?.max" :step="item?.step" />
			</label>
			<details>
				<summary>options</summary>
				<table>
					<thead>
						<tr>
							<th>option</th>
							<th>description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>color</td>
							<td>primary color of the effect (click effect and trail)</td>
						</tr>
						<tr>
							<td>scale</td>
							<td>scale of the effect</td>
						</tr>
						<tr>
							<td>opacity</td>
							<td>opacity of the effect</td>
						</tr>
						<tr>
							<td>speed</td>
							<td>animation speed</td>
						</tr>
						<tr>
							<td>maxTrail</td>
							<td>maximum number of triangles on the trail</td>
						</tr>
						<tr>
							<td>alwaysTrail</td>
							<td>show trail even when mouse is not pressed</td>
						</tr>
						<tr>
							<td>showFPS</td>
							<td>show FPS counter</td>
						</tr>
					</tbody>
				</table>
			</details>
		</div>
		<BASpark :key="updateKey" :opts="opts" />
	</main>
</template>

<style>
body {
	margin: 0;
	padding: 0;
}

.background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: -1;
	filter: blur(10px) brightness(0.5);
	pointer-events: none;
	user-select: none;
}

.contorl-panel {
	color-scheme: dark;
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 1;

	background-color: #fca6d4;
	border: 2px solid #ff1493;
	border-radius: 6px;
	padding: 8px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.contorl-item {
	display: inline-flex;
	justify-content: space-between;
	gap: 8px;
	user-select: none;
}

input {
	max-width: 20%;
}
</style>
