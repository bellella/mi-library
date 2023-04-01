import typescript from 'rollup-plugin-typescript2';

export default {
  input: './index.ts',
  output: {
    file: './typedist/bundle.js',
    format: 'iife'
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json'
    })
  ]
}