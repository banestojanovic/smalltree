import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
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
        ]),
    ],
});
