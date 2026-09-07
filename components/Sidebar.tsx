
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems } from '../app/navigation';
import { ICONS } from '../constants';
import { cx } from '../styles';

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const SidebarContent: React.FC<{ onNavigate?: () => void; mobile?: boolean }> = ({ onNavigate, mobile = false }) => {
    const linkClasses = "group flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium sidebar-muted transition hover:bg-white/10 hover:text-white";
    const activeLinkClasses = "bg-primary text-white shadow-[0_10px_24px_rgba(255,105,77,0.2)] hover:bg-primary hover:text-white";

    return (
        <div className="safe-area-bottom flex h-full flex-col overflow-y-auto px-4 py-5 text-white sm:px-5 sm:py-6">
            <div className={cx('flex items-center justify-between gap-3', mobile ? 'border-b sidebar-border px-2 pb-5' : 'px-2')}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-[0_8px_20px_rgba(255,105,77,0.24)]">{ICONS.car}</span>
                <div>
                    <h2 className="text-base font-semibold tracking-[-0.02em]">Auto AI</h2>
                    <p className="text-[11px] sidebar-muted">Vehicle intelligence</p>
                </div>
              </div>
              {mobile && (
                <button
                  type="button"
                  onClick={onNavigate}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border sidebar-border bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                  aria-label="Close navigation"
                >
                  {ICONS.close}
                </button>
              )}
            </div>

            <div className="mt-8 flex flex-1 flex-col justify-between sm:mt-12">
                <nav>
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Workspace</p>
                    {navigationItems.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={onNavigate}
                            className={({ isActive }) => cx(linkClasses, isActive && activeLinkClasses)}
                        >
                            <span className="flex h-5 w-5 items-center justify-center [&>svg]:h-[18px] [&>svg]:w-[18px]">{link.icon}</span>
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="rounded-2xl border sidebar-border bg-white/5 p-4">
                    <p className="text-xs font-semibold">Need a second opinion?</p>
                    <p className="mt-1 text-xs leading-5 sidebar-muted">Ask the AI assistant about your next repair.</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
                        <span className="h-2 w-2 rounded-full bg-primary" /> Assistant online
                    </div>
                </div>
            </div>
        </div>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (mobileOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [mobileOpen, onClose]);

    return (
    <>
        <aside className="sidebar-surface sticky top-0 hidden h-screen w-[260px] shrink-0 border-r sidebar-border lg:flex">
            <SidebarContent />
        </aside>
        {mobileOpen && (
            <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                <button type="button" className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-label="Close navigation" />
                <aside className="sidebar-surface absolute bottom-0 left-0 top-0 w-[min(21rem,calc(100vw-1.5rem))] border-r sidebar-border shadow-[20px_0_50px_rgba(0,0,0,0.25)]">
                    <SidebarContent mobile onNavigate={onClose} />
                </aside>
            </div>
        )}
    </>
    );
};

export default Sidebar;