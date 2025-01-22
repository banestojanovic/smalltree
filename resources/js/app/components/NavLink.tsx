import { cn } from '@/lib/utils';
import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & {
    active: boolean;
}) {
    return (
        <Link
            {...props}
            className={cn(
                'inline-flex items-center border-transparent px-1 pt-1 font-normal leading-5 text-gray-800 transition duration-150 ease-in-out hover:border-gray-300 hover:text-primary focus:border-gray-300 focus:text-primary focus:outline-none dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 ' +
                    (active && 'font-semibold text-primary focus:border-primary') +
                    className,
            )}
        >
            {children}
        </Link>
    );
}
