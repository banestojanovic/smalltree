import { Config } from 'ziggy-js';
import CartData = App.Data.CartData;

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth?: {
        user?: User;
    };
    ziggy?: Config & { location: string };
    cart?: CartData;
    global?: {
        env: string;
        action: string;
        categories?: App.Data.CategoryData[];
        promoPackages?: [];
        posts?: App.Data.PostData[];
    };
    flash?: {
        success: string;
        error: string;
    };
};
