import { Label } from '@/app/components/ui/label';
import { cn } from '@/lib/utils';

interface FieldGroupProps {
    name?: string;
    label?: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

export default function FieldGroup({ label, name, error, required, children, className }: FieldGroupProps) {
    return (
        <div className={cn(`relative space-y-2`, className)}>
            {label && (
                <Label htmlFor={name} className={`text-sm font-normal`}>
                    <div className={`inline-block`}>{label}</div>
                    {required && <span className="text-red-400">*</span>}
                </Label>
            )}
            {children}
            {error && <div className="absolute -bottom-5 left-2 text-xs text-red-500">{error}</div>}
        </div>
    );
}
