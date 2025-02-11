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
                'hover:text-primary focus:text-primary inline-flex items-center border-transparent px-1 pt-1 leading-5 font-normal whitespace-nowrap text-gray-800 transition duration-150 ease-in-out hover:border-gray-300 focus:border-gray-300 focus:outline-hidden dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-300 dark:focus:border-gray-700 dark:focus:text-gray-300 ' +
                    (active && 'text-primary focus:border-primary font-semibold') +
                    className,
            )}
        >
            {children}
        </Link>
    );
}
