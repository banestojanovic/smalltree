import { Label } from '@/app/components/ui/label';

interface FieldGroupProps {
    name?: string;
    label?: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

export default function FieldGroup({ label, name, error, required, children }: FieldGroupProps) {
    return (
        <div className="space-y-2">
            {label && (
                <Label htmlFor={name} className={`text-sm font-normal`}>
                    <span>{label}</span>
                    {required && <span className="text-red-400">*</span>}
                </Label>
            )}
            {children}
            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        </div>
    );
}
