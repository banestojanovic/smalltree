import { Link } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    links: PaginationItem[];
}

export default function Pagination({ links = [] }: PaginationProps) {
    if (links.length === 3) return null;

    return (
        <div className="-mb-1 mt-6 flex flex-wrap">
            {links?.map((link) => {
                return link?.url === null ? <PageInactive key={link.label} label={link.label} /> : <PaginationItem key={link.label} {...link} />;
            })}
        </div>
    );
}

interface PaginationItem {
    url?: string;
    label: string;
    active: boolean;
}

const paginationItemClasses = cva('mr-1 mb-1 px-4 py-3 border border-solid border-gray-400 rounded-md text-sm focus:outline-none hover:bg-white', {
    variants: {
        active: {
            true: 'bg-primary text-white focus:border-primary',
            false: 'text-gray-700 bg-white',
        },
    },
    defaultVariants: {
        active: false,
    },
});

function PaginationItem({ active, label, url }: PaginationItem) {
    const isNext = label.toLowerCase().includes('next');
    const isPrevious = label.toLowerCase().includes('previous');
    const { t } = useTranslation();

    return (
        <Link className={paginationItemClasses({ active })} href={url as string}>
            {isNext ? (
                <span className={'flex items-center gap-1'}>
                    {t('pagination.next')}
                    <ChevronRight className="!h-auto !w-2 sm:!w-4" />
                </span>
            ) : isPrevious ? (
                <span className={'flex items-center gap-1'}>
                    <ChevronLeft className="!h-auto !w-2 sm:!w-4" />
                    {t('pagination.previous')}
                </span>
            ) : (
                <span dangerouslySetInnerHTML={{ __html: label }} />
            )}
        </Link>
    );
}

function PageInactive({ label }: Pick<PaginationItem, 'label'>) {
    const className = cva('mr-1 bg-white mb-1 px-4 py-3 text-sm border rounded-md border-solid border-gray-400 text-gray-500');

    const isNext = label.toLowerCase().includes('next');
    const isPrevious = label.toLowerCase().includes('previous');
    const { t } = useTranslation();

    return (
        <div className={className()}>
            {isNext ? (
                <span className={'flex items-center gap-1'}>
                    {t('pagination.next')}
                    <ChevronRight className="!h-auto !w-2 sm:!w-4" />
                </span>
            ) : isPrevious ? (
                <span className={'flex items-center gap-1'}>
                    <ChevronLeft className="!h-auto !w-2 sm:!w-4" />
                    {t('pagination.previous')}
                </span>
            ) : (
                <span dangerouslySetInnerHTML={{ __html: label }} />
            )}
        </div>
    );
}
