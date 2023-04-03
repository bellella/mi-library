import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {

      file: 'build/index.mjs',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    typescript(),
    copy({
      targets: [
        { src: 'package.json', dest: 'build',
        transform: (contents, filename) => {
          return contents.toString().replace(/build\//gi, '');
        }
      },
      ]
    })
  ],
};
