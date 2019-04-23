import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: `src/index.js`,
    output: {
        file: `dist/vue-progress-bar.esm.js`,
        format: 'esm'
    },
    plugins: [
        commonjs(),
        vue()
    ]
}
