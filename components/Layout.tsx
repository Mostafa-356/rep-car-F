
import React from 'react';
import Sidebar from './Sidebar';
import ScrollToTopButton from './ScrollToTopButton';
import Chatbot from './Chatbot';
import { styles } from '../styles';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-shell flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border/70 bg-background/85 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workspace</p>
            <p className="mt-1 text-sm font-medium text-foreground">Vehicle care, simplified</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs text-muted-foreground sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI services ready
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white">AR</div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className={`${styles.page} mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10`}>
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