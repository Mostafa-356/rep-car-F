
import React from 'react';
import { HashRouter, Route, Routes, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Diagnostics from './pages/Diagnostics';
import MaintenanceSchedule from './pages/MaintenanceSchedule';
import DIYGuides from './pages/DIYGuides';
import Layout from './components/Layout';
import { NotificationProvider } from './context/NotificationContext';
import FindParts from './pages/FindParts';
import FindShops from './pages/FindShops';

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/schedule" element={<MaintenanceSchedule />} />
            <Route path="/guides" element={<DIYGuides />} />
            <Route path="/parts" element={<FindParts />} />
            <Route path="/shops" element={<FindShops />} />
          </Routes>
        </Layout>
      </HashRouter>
    </NotificationProvider>
  );
};

export default App;