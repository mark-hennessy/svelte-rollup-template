import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import path from 'path';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';

const isProduction = !process.env.ROLLUP_WATCH;

const rootDir = path.resolve(__dirname);
const srcDir = path.resolve(rootDir, 'src');
const nodeModulesDir = path.resolve(rootDir, 'node_modules');

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        },
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    alias({
      entries: [{ find: '~', replacement: srcDir }],
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      extensions: ['.js'],
      browser: true,
      dedupe: ['svelte'],
    }),

    svelte({
      // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md
      preprocess: sveltePreprocess({
        sourceMap: !isProduction,
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
        dev: !isProduction,
      },
    }),

    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !isProduction && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !isProduction && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    isProduction && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
