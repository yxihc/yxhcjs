import {defineConfig, loadEnv} from 'vite'
// import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'


export const projRoot = resolve(__dirname, '..', '..', '..')
// Docs
export const docsDirName = 'docs'
export const docRoot = resolve(projRoot, docsDirName)
export const vpRoot = resolve(docRoot, '.vitepress')


export default defineConfig(async ({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        server: {
            host: true,
            open:false,
            https: !!env.HTTPS,
            fs: {
                allow: [projRoot],
            },
        },
    }
})