
import React, { useState, useEffect, useCallback } from 'react';
import { TabType, ModSettings, LogEntry } from './types';
import Dashboard from './components/Dashboard';
import Network from './components/Network';
import Chat from './components/Chat';
import Profile from './components/Profile';
import TabBar from './components/TabBar';
import AuthSplash from './components/AuthSplash';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<ModSettings>({
    autoWinstreak: false,
    getTeamPro: false,
    getEnemyNoob: false,
    vpnLowTier: false,
    vpnLowNormal: false,
    bypassAntiBan: true,
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  const toggleMod = (key: keyof ModSettings) => {
    setSettings(prev => {
      const newVal = !prev[key];
      addLog(`${key.replace(/([A-Z])/g, ' $1').toUpperCase()} ${newVal ? 'ACTIVATED' : 'DEACTIVATED'}`, newVal ? 'success' : 'warning');
      return { ...prev, [key]: newVal };
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      addLog("System Initialized. Network Status: 200 OK", "success");
      addLog("Anti-Ban Bypass Module: ACTIVE", "info");
    }
  }, [isAuthenticated, addLog]);

  if (!isAuthenticated) {
    return <AuthSplash onComplete={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#0a0e17] overflow-hidden">
      {/* Header */}
      <header className="p-4 bg-[#111827] border-b border-[#D4AF37]/20 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center font-bold text-[#0a0e17] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            H
          </div>
          <h1 className="text-xl font-bold tracking-tight gold-glow italic">
            HOK <span className="text-[#D4AF37]">VIP</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Status</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-500">CONNECTED</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth">
        <div className="max-w-md mx-auto w-full px-4 pt-6">
          {activeTab === TabType.DASHBOARD && (
            <Dashboard settings={settings} onToggle={toggleMod} logs={logs} />
          )}
          {activeTab === TabType.NETWORK && (
            <Network settings={settings} onToggle={toggleMod} />
          )}
          {activeTab === TabType.CHAT && (
            <Chat />
          )}
          {activeTab === TabType.PROFILE && (
            <Profile />
          )}
        </div>
      </main>

      {/* Persistent Call to Action Area (Bottom Tabs) */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;
