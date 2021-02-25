const sveltePreprocess = require('svelte-preprocess');
const autoprefixer = require('autoprefixer');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md
  preprocess: sveltePreprocess({
    sourceMap: !production,
    defaults: {
      style: 'scss',
    },
    scss: {
      prependData: `@import 'src/styles/variables.scss';`,
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  }),
  compilerOptions: {
    // enable run-time checks when not in production
    dev: !production,
  },
};
