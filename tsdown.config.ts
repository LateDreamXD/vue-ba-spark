import { defineConfig } from 'tsdown';
import vue from 'unplugin-vue/rolldown';

export default defineConfig({
	plugins: [vue()],
	tsconfig: './tsconfig.app.json',
	dts: {
		vue: true
	},
	hash: false,
	exports: true,
	sourcemap: true,
	fixedExtension: false,
	format: {
		cjs: {
			dts: false,
			platform: 'node'
		},
		esm: {
			platform: 'browser'
		}
	}
});
