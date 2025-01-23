import { Link } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
    links: PaginationItem[];
}

export default function Pagination({ links = [] }: PaginationProps) {
    if (links.length === 3) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {links?.map((link, index) => (
                <motion.div key={index} initial={{ y: `${index + 50}px` }} whileInView={{ y: 0 }} transition={{ type: 'spring', duration: (index + 1) / 6 }} className={`flex`}>
                    {link?.url === null ? <PageInactive key={link.label} label={link.label} /> : <PaginationItem key={link.label} {...link} />}
                </motion.div>
            ))}
        </div>
    );
}

interface PaginationItem {
    url?: string;
    label: string;
    active: boolean;
}

const paginationItemClasses = cva('px-4 flex items-center justify-center h-12 border border-foreground/50 rounded-md text-foreground capitalize text-sm focus:outline-hidden hover:bg-accent', {
    variants: {
        active: {
            true: 'bg-primary text-white border-primary hover:bg-primary cursor-default',
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
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </span>
            ) : isPrevious ? (
                <span className={'flex items-center gap-1'}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    {t('pagination.previous')}
                </span>
            ) : (
                <span dangerouslySetInnerHTML={{ __html: label }} />
            )}
        </Link>
    );
}

function PageInactive({ label }: Pick<PaginationItem, 'label'>) {
    const className = cva('flex items-center justify-center px-4 h-12 border border-foreground/10 bg-white/50 rounded-md text-sm text-muted-foreground focus:outline-hidden hover:bg-white/50');

    const isNext = label.toLowerCase().includes('next');
    const isPrevious = label.toLowerCase().includes('previous');

    return <div className={isNext || isPrevious ? 'hidden' : className()}>{isNext || isPrevious ? '' : <span dangerouslySetInnerHTML={{ __html: label }} />}</div>;
}
