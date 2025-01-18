import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface NumberInputProps extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
    stepper?: number;
    thousandSeparator?: string;
    placeholder?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    value?: number; // Controlled value
    suffix?: string;
    prefix?: string;
    onValueChange?: (value: number | undefined) => void;
    fixedDecimalScale?: boolean;
    decimalScale?: number;
}

// eslint-disable-next-line react/display-name
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            stepper,
            thousandSeparator,
            placeholder,
            defaultValue,
            min = -Infinity,
            max = Infinity,
            onValueChange,
            fixedDecimalScale = false,
            decimalScale = 0,
            suffix,
            prefix,
            value: controlledValue,
            ...props
        },
        ref,
    ) => {
        const internalRef = useRef<HTMLInputElement>(null); // Create an internal ref
        const combinedRef = ref || internalRef; // Use provided ref or internal ref
        const [value, setValue] = useState<number | undefined>(controlledValue ?? defaultValue);

        const handleIncrement = useCallback(() => {
            setValue((prev) => (prev === undefined ? (stepper ?? 1) : Math.min(prev + (stepper ?? 1), max)));
        }, [stepper, max]);

        const handleDecrement = useCallback(() => {
            setValue((prev) => (prev === undefined ? -(stepper ?? 1) : Math.max(prev - (stepper ?? 1), min)));
        }, [stepper, min]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (document.activeElement === (combinedRef as React.RefObject<HTMLInputElement>).current) {
                    if (e.key === 'ArrowUp') {
                        handleIncrement();
                    } else if (e.key === 'ArrowDown') {
                        handleDecrement();
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [handleIncrement, handleDecrement, combinedRef]);

        useEffect(() => {
            if (controlledValue !== undefined) {
                setValue(controlledValue);
            }
        }, [controlledValue]);

        const handleChange = (values: { value: string; floatValue: number | undefined }) => {
            const newValue = values.floatValue === undefined ? undefined : values.floatValue;
            setValue(newValue);
            if (onValueChange) {
                onValueChange(newValue);
            }
        };

        const handleBlur = () => {
            if (value !== undefined) {
                if (value < min) {
                    setValue(min);
                    (ref as React.RefObject<HTMLInputElement>).current!.value = String(min);
                } else if (value > max) {
                    setValue(max);
                    (ref as React.RefObject<HTMLInputElement>).current!.value = String(max);
                }
            }
        };

        const btnClass = 'h-full px-3 py-[1px] shadow-none bg-white rounded-none focus-visible:relative disabled:opacity-1 disabled:text-foreground/40';

        return (
            <div className="flex items-center overflow-hidden rounded-lg border bg-input has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-1">
                <NumericFormat
                    value={value}
                    onValueChange={handleChange}
                    thousandSeparator={thousandSeparator}
                    decimalScale={decimalScale}
                    fixedDecimalScale={fixedDecimalScale}
                    allowNegative={min < 0}
                    valueIsNumericString
                    onBlur={handleBlur}
                    max={max}
                    min={min}
                    suffix={suffix}
                    prefix={prefix}
                    customInput={Input}
                    placeholder={placeholder}
                    className="h-vh relative rounded-none border-none bg-input font-normal shadow-none [appearance:textfield] focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    getInputRef={combinedRef}
                    {...props}
                />
                <div className="flex flex-col items-center">
                    <Button type="button" aria-label="Increase value" className={`${btnClass} border-x-0 border-t-0`} variant="outline" onClick={handleIncrement} disabled={value === max}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </Button>
                    <Button type="button" aria-label="Decrease value" className={`${btnClass} border-0 border-x-0`} variant="outline" onClick={handleDecrement} disabled={value === min}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </Button>
                </div>
            </div>
        );
    },
);
