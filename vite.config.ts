import { defineConfig } from 'vite';
import vue from 'unplugin-vue/vite';

export default defineConfig({
	plugins: [vue()],
	base: './',
	build: {
		outDir: 'page'
	}
});
