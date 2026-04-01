import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import run from 'vite-plugin-run';

const appUrl = process.env.APP_URL || 'https://smalltree.test';
const appHost = new URL(appUrl).hostname;
const appProtocol = new URL(appUrl).protocol.replace(':', '');

export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        run([
            {
                name: 'typescript transform',
                run: ['php', 'artisan', 'typescript:transform'],
                pattern: ['app/**/*Data.php', 'app/**/Enums/**/*.php'],
            },
            {
                name: 'combine language files',
                run: ['php', 'artisan', 'app:i18n'],
                pattern: ['resources/lang/en.json', 'resources/lang/sr.json'],
            },
        ]),
    ],
    server: {
        host: appHost,
        port: 5173,
        strictPort: true,
        cors: {
            origin: appUrl,
            credentials: true,
        },
        hmr: {
            host: appHost,
            protocol: appProtocol === 'https' ? 'wss' : 'ws',
        },
    },
    resolve: {
        alias: {
            '@lang': path.resolve('resources/lang'),
        },
    },
});
