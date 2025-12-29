
import React from 'react';
import { TabType } from '../types';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#111827]/90 backdrop-blur-xl border-t border-gray-800/60 flex items-center justify-around px-2 py-3 pb-6 z-50">
      <TabItem 
        label="Modules" 
        isActive={activeTab === TabType.DASHBOARD} 
        onClick={() => onTabChange(TabType.DASHBOARD)}
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
      />
      <TabItem 
        label="Network" 
        isActive={activeTab === TabType.NETWORK} 
        onClick={() => onTabChange(TabType.NETWORK)}
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10.5 10.5 0 0114.142 0M1.414 7.05a16.5 16.5 0 0121.172 0" /></svg>}
      />
      <TabItem 
        label="VIP Chat" 
        isActive={activeTab === TabType.CHAT} 
        onClick={() => onTabChange(TabType.CHAT)}
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
      />
      <TabItem 
        label="Profile" 
        isActive={activeTab === TabType.PROFILE} 
        onClick={() => onTabChange(TabType.PROFILE)}
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
      />
    </nav>
  );
};

interface TabItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-[#D4AF37] scale-110' : 'text-gray-500'}`}
  >
    <div className={`transition-transform duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    {isActive && <div className="w-1 h-1 rounded-full bg-[#D4AF37] mt-0.5" />}
  </button>
);

export default TabBar;
