import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

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
    commonjs(),
    babel({extensions: ['.js', '.jsx', '.ts', '.tsx']}),
    resolve({extensions: ['.js', '.jsx', '.ts', '.tsx']}),
  ],
};
