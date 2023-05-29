import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import css from "rollup-plugin-import-css";

import cssimport from 'postcss-import';
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {

      file: 'build/index.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    css()
  ],
};
