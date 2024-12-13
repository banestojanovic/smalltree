import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';
import run from 'vite-plugin-run';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        run([
            {
                name: 'combine language files',
                run: ['php', 'artisan', 'app:i18n'],
                pattern: ['locales/**/*.json'],
            },
            {
                name: 'typescript transform',
                run: ['php', 'artisan', 'typescript:transform'],
                pattern: ['app/**/*Data.php', 'app/**/Enums/**/*.php'],
            },
        ]),
    ],
    resolve: {
        alias: {
            '@lang': path.resolve('resources/locales'),
        },
    },
});
