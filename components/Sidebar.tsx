
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ICONS } from '../constants';

const navigationLinks = [
  { to: '/', icon: ICONS.dashboard, label: 'Dashboard' },
  { to: '/diagnostics', icon: ICONS.diagnostics, label: 'Diagnostics' },
  { to: '/schedule', icon: ICONS.schedule, label: 'Maintenance' },
  { to: '/guides', icon: ICONS.guides, label: 'DIY Guides' },
  { to: '/parts', icon: ICONS.parts, label: 'Find Parts' },
  { to: '/shops', icon: ICONS.shops, label: 'Find Shops' },
];

const Sidebar: React.FC = () => {
    const linkClasses = "flex items-center px-4 py-2.5 text-gray-400 transition-colors duration-200 transform rounded-lg hover:bg-gray-700";
    const activeLinkClasses = "bg-gray-700 text-white";

    return (
        <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-800 border-r rtl:border-r-0 rtl:border-l">
            <div className="flex items-center space-x-2 px-4">
                <span className="text-2xl text-white">{ICONS.car}</span>
                <h2 className="text-xl font-semibold text-white">Auto AI</h2>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    {navigationLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                        >
                            {link.icon}
                            <span className="mx-4 font-medium">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;