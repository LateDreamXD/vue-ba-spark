type Options = {
	/**
	 * primary color of the effect (click effect and trail), format: `r,g,b`
	 * @default '45,175,255'
	 */
	color?: string;
	/**
	 * scale of the effect
	 * @default 1.5
	 */
	scale?: number;
	/**
	 * opacity of the effect
	 * @default 1
	 */
	opacity?: number;
	/**
	 * animation speed
	 * @default 1
	 */
	speed?: number;
	/**
	 * maximum number of triangles on the trail
	 * @default 16
	 */
	maxTrail?: number;
	/**
	 * show trail even when mouse is not pressed
	 * @default false
	 */
	alwaysTrail?: boolean;
	/**
	 * show FPS counter
	 * @default false
	 */
	showFPS?: boolean;
}

type Pos = {
	x: number;
	y: number;
}

type Wave = {
	x: number;
	y: number;
	life: number;
	max: number;
	r: number;
	ring: {
		ang: number;
		segs: { off: number, len: number }[];
		life: number;
		maxLife: number;
		rs: number;
	}
}

type Spark = {
	x: number;
	y: number,
	vx: number,
	vy: number,
	rot: number,
	rs: number,
	s: number,
	a: number,
	f: number,
}

type Trail = {
	x: number;
	y: number;
	life: number;
}

export { Options, Pos, Wave, Spark, Trail }