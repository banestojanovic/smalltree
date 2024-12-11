import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    global: {
        categories: App.Data.CategoryData[];
    };
};

export type Paginated<
    T extends Record<string, unkown> = Record<string, unkown>,
> = T & {
    data: T[App.Data][];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    links?: {
        first: string;
        last: string;
        next?: string;
        prev?: string;
    };
};
