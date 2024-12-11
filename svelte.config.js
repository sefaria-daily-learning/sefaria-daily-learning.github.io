import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			pages: 'build', // output directory for built pages
			assets: 'build', // output directory for built assets
			fallback: undefined // set this if using SPA mode
		}),
		prerender: {
			default: true // prerender all routes by default
		}
	}

};