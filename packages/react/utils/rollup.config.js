import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom', '@types/react', 'react/jsx-runtime'],
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
    //commonjs(),
    babel({extensions: ['.js', '.jsx', '.ts', '.tsx']}),
    resolve({extensions: ['.js', '.jsx', '.ts', '.tsx']}),
    copy({
      targets: [
        { src: 'package.json', dest: 'build',
        transform: (contents, filename) => {
          return contents.toString().replace(/build\//gi, '');
        }
      },
      { src: '../LICENSE', dest: 'build'}
      ]
    })
  ],
};
