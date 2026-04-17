<script setup lang="ts">
import { CanvasHTMLAttributes, reactive, ref, onMounted, onUnmounted } from 'vue';
import { Options, Pos, Wave, Spark, Trail } from './types';

interface Props extends /** @vue-ignore */ CanvasHTMLAttributes {
	opts?: Options
	style?: Record<string, any>;
}

const props = defineProps<Props>();

const opts: Options = {
	color: '45,175,255',
	scale: 1.5,
	opacity: 1,
	speed: 1,
	maxTrail: 16,
	alwaysTrail: false,
	showFPS: false,
	...props.opts
}

const stats = reactive({
	sparkPool: [] as Spark[],
	wavePool: [] as Wave[],

	waves: [] as Wave[],
	sparks: [] as Spark[],
	trail: [] as Trail[],

	isDown: false,
	lastPos: null as Pos | null,
	baseFrameMs: 1000 / 60,
	maxDeltaMs: 100,

	lastFrameTime: performance.now(),
	eventListeners: {
		mouseup() { stats.isDown = false; },
		mousedown(e: MouseEvent) {
			stats.isDown = true;
			stats.lastPos = getPos(e);
			boom(stats.lastPos!.x, stats.lastPos!.y);
		},
		mousemove(e: MouseEvent) {
			if (!stats.isDown && !opts.alwaysTrail!) return;
			const p = getPos(e);
			if (!stats.lastPos) stats.lastPos = p;

			if (stats.lastPos && distPos(p, stats.lastPos) > 2) {
				stats.trail.push({ x: p.x, y: p.y, life: 1 });
				stats.lastPos = p;
				if (stats.trail.length > opts.maxTrail!) stats.trail.shift();

				if (Math.random() < 0.3) {
					let a = Math.random() * Math.PI * 2;
					let speedAdjust = opts.scale! / 1.5;
					stats.sparks.push({
						x: p.x + Math.cos(a) * 10 * opts.scale!,
						y: p.y + Math.sin(a) * 10 * opts.scale!,
						vx: Math.cos(a) * 1.3 * speedAdjust,
						vy: Math.sin(a) * 1.3 * speedAdjust,
						rot: Math.random() * Math.PI * 2,
						rs: 0.16,
						s: 9 * opts.scale!,
						a: 0.7,
						f: 0.95
					});
				}
			}
		}
	}
});

const canvas = ref<HTMLCanvasElement>();

const resize = (canvas: HTMLCanvasElement) => {
	const dpr = window.devicePixelRatio || 1;
	canvas.width = window.innerWidth * dpr;
	canvas.height = window.innerHeight * dpr;
	canvas.getContext('2d')?.scale(dpr, dpr);
}

const getAlpha = (a: number) => Math.max(0, Math.min(1, a * opts.opacity!));
const getPos = (e: MouseEvent): Pos => ({ x: e.clientX, y: e.clientY });
const distPos = (a: Pos, b: Pos) => Math.hypot(a.x - b.x, a.y - b.y);

const boom = (x: number, y: number) => {
	let wave: Wave;
	if (stats.wavePool.length > 0) {
		wave = stats.wavePool.pop()!;
		wave.x = x;
		wave.y = y;
		wave.life = 0;
		wave.max = 18;
		wave.r = 0;
		wave.ring.ang = Math.random() * Math.PI * 2;
		wave.ring.life = 0;
	} else {
		wave = {
			x, y,
			life: 0,
			max: 18,
			r: 0,
			ring: {
				ang: Math.random() * Math.PI * 2,
				segs: [
					{ off: -0.25 * Math.PI, len: 1.15 * Math.PI },
					{ off: 0.00 * Math.PI, len: 1.15 * Math.PI },
					{ off: 0.25 * Math.PI, len: 1.15 * Math.PI }
				],
				life: 0, maxLife: 30, rs: 0.08
			}
		}
	}
	stats.waves.push(wave);

	const particleCount = 4;
	const speedAdjust = opts.scale! / 1.5;
	for (let i = 0; i < particleCount; i++) {
		const a = Math.random() * Math.PI * 2;
		const speed = (4.8 + Math.random() * 2) * speedAdjust;

		let spark: Spark;
		if (stats.sparkPool.length > 0) {
			spark = stats.sparkPool.pop()!;
			spark.x = x;
			spark.y = y;
			spark.vx = Math.cos(a) * speed;
			spark.vy = Math.sin(a) * speed;
			spark.rot = Math.random() * Math.PI * 2;
			spark.rs = (Math.random() - 0.5) * 0.28;
			spark.s = (4 + Math.random() * 3) * opts.scale!;
			spark.a = 1;
			spark.f = 0.9;
		} else {
			spark = {
				x, y,
				vx: Math.cos(a) * speed,
				vy: Math.sin(a) * speed,
				rot: Math.random() * Math.PI * 2,
				rs: (Math.random() - 0.5) * 0.28,
				s: (4 + Math.random() * 3) * opts.scale!,
				a: 1, f: 0.9
			};
		}
		stats.sparks.push(spark);
	}
}

const bindEvents = () => {
	window.addEventListener('mousedown', stats.eventListeners.mousedown);
	window.addEventListener('mousemove', stats.eventListeners.mousemove);
	window.addEventListener('mouseup', stats.eventListeners.mouseup);
}

const unbindEvents = () => {
	window.removeEventListener('mousedown', stats.eventListeners.mousedown);
	window.removeEventListener('mousemove', stats.eventListeners.mousemove);
	window.removeEventListener('mouseup', stats.eventListeners.mouseup);
}

const loop = (now: number, canvas: HTMLCanvasElement) => {
	const deltaMs = Math.min(now - stats.lastFrameTime, stats.maxDeltaMs!);
	stats.lastFrameTime = now;
	const frameScale = (deltaMs / stats.baseFrameMs!) * opts.speed!;
	const ctx = canvas.getContext('2d')!;

	if (stats.waves.length > 0 || stats.sparks.length > 0 || stats.trail.length > 0) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// 优化：减少全局合成模式的使用
		ctx.globalCompositeOperation = 'lighter';

		for (let i = stats.trail.length - 1; i >= 0; i--) {
			let t = stats.trail[i];
			if (opts.alwaysTrail!) {
				t.life -= 0.085 * frameScale;
			} else {
				t.life -= (stats.isDown ? 0.085 : 0.18) * frameScale;
			}
			if (t.life <= 0) stats.trail.splice(i, 1);
		}

		if (stats.trail.length > 1) {
			ctx.beginPath();
			ctx.moveTo(stats.trail[0].x, stats.trail[0].y);
			stats.trail.forEach(t => ctx.lineTo(t.x, t.y));
			ctx.lineWidth = 5.0;

			const meteorHead = stats.trail[stats.trail.length - 1];
			const meteorTail = stats.trail[0];
			const gradient = ctx.createLinearGradient(
				meteorHead.x, meteorHead.y,
				meteorTail.x, meteorTail.y
			);
			gradient.addColorStop(0, `rgba(${opts.color}, 1)`);
			gradient.addColorStop(1, `rgba(${opts.color}, 0)`);

			ctx.shadowColor = `rgba(${opts.color}, 0.6)`;
			ctx.shadowBlur = 3;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;

			ctx.strokeStyle = gradient;
			ctx.stroke();
			ctx.shadowColor = 'transparent';

		}

		stats.waves.forEach((w, i) => {
			w.life += frameScale;
			let progress = w.life / w.max;
			let ease = 1 - Math.pow(1 - Math.min(progress, 1), 3);
			w.r = 26 * opts.scale! * ease;
			let alpha = Math.max(0, 1 - progress);
			if (alpha > 0) {
				ctx.beginPath();
				ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${opts.color},${getAlpha(alpha)})`;
				// 优化：减少阴影效果
				ctx.fill();
			}

			let r = w.ring;
			r.life += frameScale;
			let rProg = Math.min(r.life / r.maxLife, 1);
			r.ang -= r.rs * frameScale;
			r.segs.forEach(seg => {
				let shrink = Math.max(0, 1 - rProg);
				let len = seg.len * shrink;
				let start = r.ang + seg.off;
				ctx.beginPath();
				ctx.arc(w.x, w.y, w.r + 3 * opts.scale!, start, start + len);
				ctx.lineWidth = 3.7;
				ctx.strokeStyle = `rgba(245,248,252,${getAlpha(1 - rProg)})`;
				// 减少阴影效果
				ctx.stroke();
			});
			if (progress >= 1 && rProg >= 1) {
				// 回收对象到对象池
				stats.wavePool.push(w);
				stats.waves.splice(i, 1);
			}
		});

		stats.sparks.forEach((s, i) => {
			s.x += s.vx * frameScale;
			s.y += s.vy * frameScale;
			s.vx *= Math.pow(s.f, frameScale);
			s.vy *= Math.pow(s.f, frameScale);
			s.rot += s.rs * frameScale;
			s.a -= 0.032 * frameScale;
			if (s.a <= 0) {
				stats.sparkPool.push(s);
				stats.sparks.splice(i, 1);
				return;
			}

			ctx.save();
			ctx.translate(s.x, s.y);
			ctx.rotate(s.rot);
			ctx.beginPath();
			ctx.moveTo(0, -s.s);
			ctx.lineTo(s.s * 0.6, s.s * 0.6);
			ctx.lineTo(-s.s * 0.6, s.s * 0.6);
			ctx.fillStyle = `rgba(255,255,255,${getAlpha(s.a)})`;
			ctx.fill();
			ctx.restore();
		});
		ctx.globalCompositeOperation = 'source-over';
	}

	if (opts.showFPS!) {
		const pos: Pos = { x: window.innerWidth - 100, y: window.innerHeight - 20 };
		ctx.clearRect(pos.x - 10, pos.y - 10, canvas.width, canvas.height);
		ctx.font = '12px sans-serif';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.fillText(`FPS: ${Math.round(1000 / deltaMs)}`, pos.x, pos.y);
	}
	requestAnimationFrame((nextNow) => loop(nextNow, canvas));
}

onMounted(() => {
	resize(canvas.value!);
	bindEvents();
	loop(performance.now(), canvas.value!);
});

onUnmounted(() => {
	unbindEvents();
});
</script>

<template>
	<canvas class="ba-spark" :style="{ ...style, pointerEvents: 'none', position: 'fixed', left: 0, top: 0, zIndex: 100000 }" ref="canvas" />
</template>