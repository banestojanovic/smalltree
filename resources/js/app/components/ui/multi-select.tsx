import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/app/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Separator } from '@/app/components/ui/separator';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva('m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300', {
    variants: {
        variant: {
            default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
            secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            inverted: 'inverted',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
    /**
     * An array of option objects to be displayed in the multi-select component.
     * Each option object has a label, value, and an optional icon.
     */
    options: {
        /** The text to display for the option. */
        label: string;
        /** The unique value associated with the option. */
        value: string;
        /** Optional icon component to display alongside the option. */
        icon?: React.ComponentType<{ className?: string }>;
    }[];

    /**
     * Callback function triggered when the selected values change.
     * Receives an array of the new selected values.
     */
    onValueChange: (value: string[]) => void;

    /** The default selected values when the component mounts. */
    defaultValue?: string[];

    /**
     * Placeholder text to be displayed when no values are selected.
     * Optional, defaults to "Select options".
     */
    placeholder?: string;

    /**
     * Animation duration in seconds for the visual effects (e.g., bouncing badges).
     * Optional, defaults to 0 (no animation).
     */
    animation?: number;

    /**
     * Maximum number of items to display. Extra selected items will be summarized.
     * Optional, defaults to 3.
     */
    maxCount?: number;

    /**
     * The modality of the popover. When set to true, interaction with outside elements
     * will be disabled and only popover content will be visible to screen readers.
     * Optional, defaults to false.
     */
    modalPopover?: boolean;

    /**
     * If true, renders the multi-select component as a child of another component.
     * Optional, defaults to false.
     */
    asChild?: boolean;

    /**
     * Additional class names to apply custom styles to the multi-select component.
     * Optional, can be used to add custom styles.
     */
    className?: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
    ({ options, onValueChange, variant, defaultValue = [], placeholder = 'Select options', animation = 0, maxCount = 3, modalPopover = false, asChild = false, className, ...props }, ref) => {
        const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

        const { t } = useTranslation();

        const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                setIsPopoverOpen(true);
            } else if (event.key === 'Backspace' && !event.currentTarget.value) {
                const newSelectedValues = [...selectedValues];
                newSelectedValues.pop();
                setSelectedValues(newSelectedValues);
                onValueChange(newSelectedValues);
            }
        };

        const toggleOption = (option: string) => {
            const newSelectedValues = selectedValues.includes(option) ? selectedValues.filter((value) => value !== option) : [...selectedValues, option];
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        };

        const handleClear = () => {
            setSelectedValues([]);
            onValueChange([]);
        };

        const handleTogglePopover = () => {
            setIsPopoverOpen((prev) => !prev);
        };

        const clearExtraOptions = () => {
            const newSelectedValues = selectedValues.slice(0, maxCount);
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        };

        const toggleAll = () => {
            if (selectedValues.length === options.length) {
                handleClear();
            } else {
                const allValues = options.map((option) => option.value);
                setSelectedValues(allValues);
                onValueChange(allValues);
            }
        };

        return (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
                <PopoverTrigger asChild>
                    <Button ref={ref} {...props} onClick={handleTogglePopover} variant={`outlined-white`} className={`h-12`}>
                        {selectedValues.length > 0 ? (
                            <div className="flex w-full items-center justify-between space-x-4">
                                <div className="flex flex-wrap items-center space-x-2 text-foreground">
                                    <span>{placeholder}</span>
                                    <Badge className={`flex size-5 items-center justify-center rounded-full`}>{selectedValues.length}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="flex w-full items-center justify-between space-x-4">
                                <div className="flex flex-wrap items-center space-x-2 text-foreground">
                                    <span>{placeholder}</span>
                                    <Badge className={`flex size-5 items-center justify-center rounded-full bg-accent/50 font-light text-accent-foreground`}>{selectedValues.length}</Badge>
                                </div>

                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto border-foreground/40 p-0 shadow-none" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
                    <Command>
                        <CommandInput placeholder={t('filters.messages.start_typing')} onKeyDown={handleInputKeyDown} className={``} />
                        <CommandList>
                            <CommandEmpty>{t('filters.messages.no_results_found')}</CommandEmpty>
                            <CommandGroup>
                                <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer py-3 text-foreground">
                                    <div
                                        className={cn(
                                            'mr-2 flex size-4 items-center justify-center rounded-sm border border-border',
                                            selectedValues.length === options.length ? 'bg-primary text-white' : '[&_svg]:invisible',
                                        )}
                                    >
                                        <CheckIcon />
                                    </div>
                                    {selectedValues.length === options.length ? <span>{t('filters.messages.deselect_all')}</span> : <span>{t('filters.messages.select_all')}</span>}
                                </CommandItem>
                                {options.map((option) => {
                                    const isSelected = selectedValues.includes(option.value);
                                    return (
                                        <CommandItem key={option.value} onSelect={() => toggleOption(option.value)} className="cursor-pointer py-3">
                                            <div
                                                className={cn(
                                                    'mr-2 flex size-4 items-center justify-center rounded-sm border border-border',
                                                    isSelected ? 'bg-primary text-white' : '[&_svg]:invisible',
                                                )}
                                            >
                                                <CheckIcon className="h-4 w-4" />
                                            </div>
                                            {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                                            <span>{option.label}</span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="flex items-center justify-between">
                                    {selectedValues.length > 0 && (
                                        <>
                                            <CommandItem onSelect={handleClear} className="flex-1 cursor-pointer justify-center">
                                                {t('filters.messages.clear')}
                                            </CommandItem>
                                            <Separator orientation="vertical" className="flex h-full min-h-6" />
                                        </>
                                    )}
                                    <CommandItem onSelect={() => setIsPopoverOpen(false)} className="max-w-full flex-1 cursor-pointer justify-center">
                                        {t('filters.messages.close')}
                                    </CommandItem>
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    },
);

MultiSelect.displayName = 'MultiSelect';
