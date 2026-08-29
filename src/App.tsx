import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { WaterSchedulePage } from './components/WaterSchedulePage';
import { AILeakageReportingPage } from './components/AILeakageReportingPage';
import { ComplaintsPage } from './components/ComplaintsPage';
import { TankerFinderPage } from './components/TankerFinderPage';
import { NotificationCenterPage } from './components/NotificationCenterPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginModals } from './components/LoginModals';
import { 
  mockCitizenProfile, 
  mockSupplySchedule, 
  mockReservoirs, 
  mockWeather, 
  mockAlerts 
} from './data/mockData';
import { CitizenProfile, AppView } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [isCitizenModalOpen, setIsCitizenModalOpen] = useState(false);
  const [citizenProfile, setCitizenProfile] = useState<CitizenProfile>(mockCitizenProfile);
  const [supplySchedule, setSupplySchedule] = useState(mockSupplySchedule);
  const [alerts, setAlerts] = useState(mockAlerts);

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  const handleLoginSuccess = (role: 'citizen' | 'admin', profile?: CitizenProfile) => {
    if (profile) {
      setCitizenProfile(profile);
    }
    setCurrentView('dashboard');
  };

  const handleCitizenLoginSuccess = (customProfile?: Partial<CitizenProfile>) => {
    if (customProfile) {
      setCitizenProfile((prev) => ({
        ...prev,
        ...customProfile,
      }));
    }
    setIsCitizenModalOpen(false);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen editorial-canvas text-slate-100 relative selection:bg-cyan-400 selection:text-slate-950 font-sans flex flex-col justify-between">
      {/* Editorial Ambient Radial Glow Accents */}
      <div className="fixed top-0 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header (Hidden on Login screen for immersive login experience) */}
      {currentView !== 'login' && (
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenCitizenLogin={() => setIsCitizenModalOpen(true)}
          citizenProfile={citizenProfile}
          unreadAlertsCount={unreadAlertsCount}
          onLogout={() => setCurrentView('login')}
        />
      )}

      {/* Main View Transition Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1">
        <AnimatePresence mode="wait">
          
          {/* 1. Login Page */}
          {currentView === 'login' && (
            <motion.div
              key="login-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateDirect={(view) => setCurrentView(view)}
              />
            </motion.div>
          )}

          {/* 2. Citizen Dashboard */}
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Dashboard
                weather={mockWeather}
                profile={citizenProfile}
                schedule={supplySchedule}
                reservoirs={mockReservoirs}
                alerts={alerts}
                onNavigate={(view) => setCurrentView(view)}
              />
            </motion.div>
          )}

          {/* 3. Water Schedule Page */}
          {currentView === 'water-schedule' && (
            <motion.div
              key="water-schedule-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <WaterSchedulePage
                currentSchedule={supplySchedule}
                profile={citizenProfile}
                onNavigate={(view) => setCurrentView(view)}
              />
            </motion.div>
          )}

          {/* 4. AI Leakage & Reporting Page */}
          {currentView === 'leakage-reporting' && (
            <motion.div
              key="leakage-reporting-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <AILeakageReportingPage />
            </motion.div>
          )}

          {/* 5. Complaints Page */}
          {currentView === 'complaints' && (
            <motion.div
              key="complaints-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ComplaintsPage
                profile={citizenProfile}
              />
            </motion.div>
          )}

          {/* 6. Tanker Finder Page */}
          {currentView === 'tanker-finder' && (
            <motion.div
              key="tanker-finder-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <TankerFinderPage
                profile={citizenProfile}
              />
            </motion.div>
          )}

          {/* 7. Notification Center Page */}
          {currentView === 'notifications' && (
            <motion.div
              key="notifications-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <NotificationCenterPage
                onNavigate={(view) => setCurrentView(view)}
              />
            </motion.div>
          )}

          {/* 8. Citizen Profile Page */}
          {currentView === 'profile' && (
            <motion.div
              key="profile-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ProfilePage
                profile={citizenProfile}
                onUpdateProfile={(updated) => setCitizenProfile((prev) => ({ ...prev, ...updated }))}
                onNavigate={(view) => setCurrentView(view)}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Editorial Aesthetic Global Footer */}
      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 uppercase tracking-[0.2em]">
        <p className="font-medium text-slate-400">HYDERABAD CITIZEN WATER PORTAL</p>
        <p>AquaMind &copy; 2026 • GHMC & HMWSSB Citizen Services</p>
      </footer>

      {/* Authentication Modals (Quick switch modal for citizen profiles) */}
      <LoginModals
        isCitizenModalOpen={isCitizenModalOpen}
        isAdminModalOpen={false}
        onCloseCitizenModal={() => setIsCitizenModalOpen(false)}
        onCloseAdminModal={() => {}}
        onCitizenLoginSuccess={handleCitizenLoginSuccess}
        onAdminLoginSuccess={() => {}}
      />
    </div>
  );
}
