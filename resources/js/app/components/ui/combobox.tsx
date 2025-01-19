'use client';

import { Check } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/app/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/app/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ComboboxProps {
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    inputPlaceholder?: string;
    className?: string;
    children: React.ReactNode;
}

interface ComboboxItemProps {
    value: any;
    children: React.ReactNode;
}

export function Combobox({ value, onChange, placeholder = 'Select an option...', inputPlaceholder = 'Search...', className, children }: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    const { t } = useTranslation();

    const options = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ComboboxItem) {
            return {
                value: child.props.value,
                label: child.props.children,
                element: child,
            };
        }
        return null;
    })?.filter(Boolean);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outlined-white" role="combobox" aria-expanded={open} className={cn('h-12 justify-between', className)}>
                    {value ? options?.find((option) => option.value === value)?.label : placeholder}

                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={inputPlaceholder} />
                    <CommandList>
                        <CommandEmpty>{t('filters.messages.no_results_found')}</CommandEmpty>
                        <CommandGroup>
                            {options?.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                    {value === option.value && <Check className={cn('ml-auto opacity-100')} />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export function ComboboxItem({ value, children }: ComboboxItemProps) {
    return <>{children}</>;
}
