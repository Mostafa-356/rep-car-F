
import React from 'react';
import Sidebar from './Sidebar';
import ScrollToTopButton from './ScrollToTopButton';
import Chatbot from './Chatbot';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-secondary/50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary/50">
          <div className="container mx-auto px-6 py-8">
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