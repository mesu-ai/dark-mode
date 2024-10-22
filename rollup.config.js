import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const devMode = process.env.NODE_ENV === 'development';
console.log('devMode', devMode);

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "es",
      sourcemap: devMode ? 'inline' : false,
    },
    
    external: ['react', 'react-dom'],
    plugins: [
      babel({
        exclude: 'node_modules/**', 
        babelHelpers: 'bundled',
        presets: [
          "@babel/preset-react",
        ]
      }),
      terser({
        ecma: 2020,
        mangle: {
          toplevel: true
        },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
          drop_console: !devMode,
          drop_debugger: !devMode,
        },
        output: {
          quote_style: 1,
        }
      })
    ]
  }
];
