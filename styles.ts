export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

export const styles = {
  page: 'space-y-8',
  pageHeader: 'flex flex-col gap-2',
  pageEyebrow: 'text-xs font-semibold uppercase tracking-[0.18em] text-primary',
  pageTitle: 'text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl',
  pageDescription: 'max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base',
  card: 'rounded-[1.5rem] border border-border/80 bg-card text-card-foreground shadow-[0_14px_40px_rgba(23,23,23,0.05)]',
  cardHeader: 'flex flex-col gap-2 border-b border-border/70 p-6 sm:p-7',
  cardContent: 'p-6 sm:p-7',
  cardTitle: 'text-lg font-semibold tracking-[-0.025em] text-foreground sm:text-xl',
  cardDescription: 'text-sm leading-6 text-muted-foreground',
  label: 'mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground',
  field: 'flex min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60',
  button: {
    base: 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50',
    primary: 'bg-primary text-primary-foreground shadow-[0_8px_18px_rgba(255,105,77,0.2)] hover:-translate-y-0.5 hover:bg-primary/90',
    secondary: 'border border-border bg-card text-foreground hover:border-foreground/20 hover:bg-secondary',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    icon: 'h-11 w-11 rounded-xl p-0',
  },
  iconBox: 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground',
  divider: 'border-border/70',
  prose: 'prose prose-sm max-w-none prose-headings:font-semibold prose-headings:tracking-[-0.025em] prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
};