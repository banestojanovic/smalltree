import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

interface TypographyProps<T extends ElementType = 'p'> {
    as?: T;
    children: ReactNode;
    className?: string;
}

// Mapping of default classes for each HTML element
const defaultStyles: Record<string, string> = {
    p: 'leading-7',
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
    h3: 'scroll-m-20 text-2xl font-semibold leading-relaxed mt-2',
    h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    span: 'text-base inline-block',
    ul: 'list-disc ml-6',
    li: 'mb-2',
    default: '', // Fallback for unsupported elements
};

export function Typography<T extends ElementType = 'p'>({ as, children, className, ...rest }: TypographyProps<T> & ComponentPropsWithoutRef<T>) {
    const Component = (as || 'p') as ElementType; // Explicitly cast to ElementType
    const combinedClasses = `${defaultStyles[Component as keyof typeof defaultStyles] || defaultStyles.default} ${className || ''}`;

    return (
        <Component {...(rest as ComponentPropsWithoutRef<T>)} className={combinedClasses}>
            {children}
        </Component>
    );
}
