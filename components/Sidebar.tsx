
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../constants';
import { cx } from '../styles';

const navigationLinks = [
  { to: '/', icon: ICONS.dashboard, label: 'Dashboard' },
  { to: '/diagnostics', icon: ICONS.diagnostics, label: 'Diagnostics' },
  { to: '/schedule', icon: ICONS.schedule, label: 'Maintenance' },
  { to: '/guides', icon: ICONS.guides, label: 'DIY Guides' },
  { to: '/parts', icon: ICONS.parts, label: 'Find Parts' },
  { to: '/shops', icon: ICONS.shops, label: 'Find Shops' },
];

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const SidebarContent: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
    const linkClasses = "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/55 transition hover:bg-white/10 hover:text-white";
    const activeLinkClasses = "bg-primary text-white shadow-[0_10px_24px_rgba(255,105,77,0.2)] hover:bg-primary hover:text-white";

    return (
        <div className="flex h-full flex-col px-5 py-6 text-white">
            <div className="flex items-center gap-3 px-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">{ICONS.car}</span>
                <div>
                    <h2 className="text-base font-semibold tracking-[-0.02em]">Auto AI</h2>
                    <p className="text-[11px] text-white/45">Vehicle intelligence</p>
                </div>
            </div>

            <div className="mt-12 flex flex-1 flex-col justify-between">
                <nav>
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Workspace</p>
                    {navigationLinks.map((link) => (
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
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold">Need a second opinion?</p>
                    <p className="mt-1 text-xs leading-5 text-white/45">Ask the AI assistant about your next repair.</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
                        <span className="h-2 w-2 rounded-full bg-primary" /> Assistant online
                    </div>
                </div>
            </div>
        </div>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => (
    <>
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-white/10 bg-[#171717] lg:flex">
            <SidebarContent />
        </aside>
        {mobileOpen && (
            <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                <button type="button" className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-label="Close navigation" />
                <aside className="absolute bottom-0 left-0 top-16 w-[min(19rem,calc(100vw-3rem))] border-r border-white/10 bg-[#171717] shadow-[20px_0_50px_rgba(0,0,0,0.2)] sm:top-20">
                    <SidebarContent onNavigate={onClose} />
                </aside>
            </div>
        )}
    </>
);

export default Sidebar;