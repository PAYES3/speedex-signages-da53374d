import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  addLabel?: string;
  onAdd?: () => void;
  extra?: ReactNode;
};

/** Prominent admin page header with a large primary CTA + a sticky FAB. */
export function AdminPageHeader({ title, subtitle, addLabel = 'Add new', onAdd, extra }: Props) {
  return (
    <>
      <header className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-2 max-w-xl">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {extra}
            {onAdd && (
              <Button
                size="lg"
                onClick={onAdd}
                className="h-12 px-6 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.7)] hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.9)] hover:-translate-y-0.5 transition-all"
              >
                <Plus className="w-5 h-5" /> {addLabel}
              </Button>
            )}
          </div>
        </div>
      </header>

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          aria-label={addLabel}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 sm:h-auto sm:w-auto sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.9)] hover:scale-105 transition-transform flex items-center gap-2 font-semibold"
        >
          <Plus className="w-6 h-6" />
          <span className="hidden sm:inline">{addLabel}</span>
        </button>
      )}
    </>
  );
}