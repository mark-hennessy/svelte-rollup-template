const sveltePreprocess = require('svelte-preprocess');
const autoprefixer = require('autoprefixer');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md
  preprocess: sveltePreprocess({
    sourceMap: !production,
    babel: require('./babel.config.cjs'),
    scss: {
      prependData: `@import 'src/styles/variables.scss';`,
    },
    postcss: {
      plugins: [autoprefixer()],
    },
    defaults: {
      style: 'scss',
    },
  }),
  compilerOptions: {
    // enable run-time checks when not in production
    dev: !production,
  },
};
