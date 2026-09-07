
import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ScrollToTopButton from './ScrollToTopButton';
import Chatbot from './Chatbot';
import { styles } from '../styles';
import ThemeToggle from './ThemeToggle';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    localStorage.setItem('auto-ai-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((current) => !current), []);

  return (
    <div className="app-shell flex min-h-screen">
      <Sidebar mobileOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/70 bg-background/85 px-3 backdrop-blur-xl sm:h-20 sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workspace</p>
            <p className="mt-1 hidden text-sm font-medium text-foreground sm:block">Vehicle care, simplified</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary lg:hidden"
              aria-label="Open navigation"
              aria-expanded={isMobileNavOpen}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <div className="hidden h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs text-muted-foreground sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI services ready
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white">AR</div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className={`${styles.page} mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-8 sm:py-10 lg:px-10`}>
            {children}
          </div>
        </main>
      </div>
      <ScrollToTopButton />
      <Chatbot />
    </div>
  );
};

export default Layout;