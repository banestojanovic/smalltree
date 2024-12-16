'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/app/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/app/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/ui/popover';
import { cn } from '@/lib/utils';

interface ComboboxOption {
    [key: string]: any; // Allow flexible object structure
}

interface ComboboxProps {
    options: ComboboxOption[];
    value: any;
    onChange: (item: ComboboxOption) => void;
    placeholder?: string;
    className?: string;
    inputPlaceholder?: string;
    displayLabel?: (value: ComboboxOption) => React.ReactNode; // Render prop for displaying selected value
    children?: (item: ComboboxOption) => React.ReactNode; // Render prop for item customization
}

export function Combobox({
    options,
    value,
    onChange,
    placeholder = 'Select an option...',
    className,
    inputPlaceholder = 'Search...',
    displayLabel,
    children,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-[200px] justify-between', className)}
                >
                    {value
                        ? displayLabel
                            ? displayLabel(value) // Use displayLabel for selected value rendering
                            : options.find((option) => option === value)
                                  ?.label || 'Custom'
                        : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={inputPlaceholder} />
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.id || option.value}
                                    onSelect={() => {
                                        onChange(option);
                                        setOpen(false);
                                    }}
                                >
                                    {children ? children(option) : option.label}
                                    {value === option && (
                                        <Check
                                            className={cn(
                                                'ml-auto opacity-100',
                                            )}
                                        />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
