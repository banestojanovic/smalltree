import store from '@/app/store';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next'; // Import the provider for i18next
import { Provider } from 'react-redux';
import '../css/app.css';
import './bootstrap';
import i18n from './i18n'; // Import the i18n instance

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./app/pages/${name}.tsx`,
            import.meta.glob('./app/pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = import.meta.env.SSR ? hydrateRoot : createRoot;

        // @ts-ignore
        root(el, App, props).render(
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <App {...props} />
                </I18nextProvider>
            </Provider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
