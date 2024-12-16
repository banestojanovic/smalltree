import { Link } from '@inertiajs/react';
import { cva } from 'class-variance-authority';

interface PaginationProps {
    links: PaginationItem[];
}

export default function Pagination({ links = [] }: PaginationProps) {
    if (links.length === 3) return null;

    return (
        <div className="-mb-1 mt-6 flex flex-wrap">
            {links?.map((link) => {
                return link?.url === null ? (
                    <PageInactive key={link.label} label={link.label} />
                ) : (
                    <PaginationItem key={link.label} {...link} />
                );
            })}
        </div>
    );
}

interface PaginationItem {
    url: null | string;
    label: string;
    active: boolean;
}

// Define class variance for active and inactive pagination items
const paginationItemClasses = cva(
    'mr-1 mb-1 px-4 py-3 border border-solid border-gray-300 rounded text-sm focus:outline-none hover:bg-white',
    {
        variants: {
            active: {
                true: 'bg-white focus:border-indigo-700 focus:text-indigo-700',
                false: 'text-gray-700',
            },
        },
        defaultVariants: {
            active: false,
        },
    },
);

function PaginationItem({ active, label, url }: PaginationItem) {
    return (
        <Link
            className={paginationItemClasses({ active })}
            href={url as string}
        >
            <span dangerouslySetInnerHTML={{ __html: label }}></span>
        </Link>
    );
}

function PageInactive({ label }: Pick<PaginationItem, 'label'>) {
    const className = cva(
        'mr-1 mb-1 px-4 py-3 text-sm border rounded border-solid border-gray-300 text-gray-500',
    );

    return (
        <div
            className={className()}
            dangerouslySetInnerHTML={{ __html: label }}
        />
    );
}
