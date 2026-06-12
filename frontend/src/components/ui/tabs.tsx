import type React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem<TValue extends string> {
  value: TValue;
  label: string;
  icon: React.ReactNode;
}

export function Tabs<TValue extends string>({
  items,
  value,
  onChange,
}: {
  items: Array<TabItem<TValue>>;
  value: TValue;
  onChange: (value: TValue) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-md border border-border bg-muted p-1 sm:grid-cols-5">
      {items.map((item) => (
        <button
          className={cn(
            'inline-flex h-9 items-center justify-center gap-2 rounded px-2 text-sm font-medium transition-colors',
            value === item.value
              ? 'bg-white text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
          key={item.value}
          onClick={() => {
            onChange(item.value);
          }}
          type="button"
        >
          {item.icon}
          <span className="truncate">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
