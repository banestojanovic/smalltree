'use client';

import { Check } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/app/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/app/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { cn } from '@/lib/utils';

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
                <Button variant="outline-white" role="combobox" aria-expanded={open} className={cn('w-[200px] justify-between !py-5', className)}>
                    {value ? options?.find((option) => option.value === value)?.label : placeholder}

                    <span className="opacity-50">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.85 5.55L0 0.700001L0.7 0L4.85 4.15L9 0L9.7 0.700001L4.85 5.55Z" fill="black" />
                        </svg>
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={inputPlaceholder} />
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
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
    return <>{children}</>; // Just a marker component
}
