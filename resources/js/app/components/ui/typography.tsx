import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

interface TypographyProps<T extends ElementType = 'p'> {
    as?: T;
    children: ReactNode;
    className?: string;
}

// Mapping of default classes for each HTML element
const defaultStyles: Record<string, string> = {
    p: 'leading-7 text-[16px] sm:text-md',
    h1: 'scroll-m-20 font-merriweather text-3xl sm:text-4xl tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 font-merriweather text-2xl sm:text-3xl tracking-tight first:mt-0',
    h3: 'scroll-m-20 font-merriweather text-xl sm:text-2xl leading-relaxed',
    h4: 'scroll-m-20 font-merriweather text-lg sm:text-xl tracking-tight',
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
