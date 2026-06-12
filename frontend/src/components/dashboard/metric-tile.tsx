import type React from 'react';
import { cn } from '@/lib/utils';

export function MetricTile({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-md border border-border bg-white p-4 shadow-sm', className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted text-foreground">
          {icon}
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
