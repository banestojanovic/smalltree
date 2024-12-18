import { Label } from '@/app/components/ui/label';

interface FieldGroupProps {
    name?: string;
    label?: string;
    error?: string;
    children: React.ReactNode;
}

export default function FieldGroup({ label, name, error, children }: FieldGroupProps) {
    return (
        <div className="space-y-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            {children}
            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        </div>
    );
}
