import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        jsx: 'react-jsx', // Use modern JSX transform
        target: 'es2018',
      })
    ],
    external: (id) => {
      // More comprehensive external check
      return id === 'react' || 
             id === 'react-dom' || 
             id === 'react/jsx-runtime' ||
             id === 'react/jsx-dev-runtime' ||
             id.startsWith('react/') ||
             id.startsWith('react-dom/')
    },
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];
