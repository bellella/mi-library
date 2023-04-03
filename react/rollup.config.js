import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'build',
      format: 'cjs',
      sourcemap: true,
    },
    {

      dir: 'build',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    typescript(),
    copy({
      targets: [
        { src: 'src/package.json', dest: 'build' },
      ]
    })
  ],
};
