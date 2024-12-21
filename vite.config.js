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
                name: 'typescript transform',
                run: ['php', 'artisan', 'typescript:transform'],
                pattern: ['app/**/*Data.php', 'app/**/Enums/**/*.php'],
            },
            {
                name: 'combine language files',
                run: ['php', 'artisan', 'app:i18n'],
                // pattern: ['resources/lang/**/*.json'], // TODO: fix this for all langs
                pattern: ['resources/lang/en.json', 'resources/lang/sr.json'],
            },
        ]),
    ],
    resolve: {
        alias: {
            '@lang': path.resolve('resources/lang'),
        },
    },
});
