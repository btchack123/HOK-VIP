
import React from 'react';
import { ModSettings, LogEntry } from '../types';
import ModToggle from './ModToggle';

interface DashboardProps {
  settings: ModSettings;
  onToggle: (key: keyof ModSettings) => void;
  logs: LogEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ settings, onToggle, logs }) => {
  return (
    <div className="space-y-6 pb-6">
      <div className="vip-card rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
            <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold">Quick Toggles</h2>
            <p className="text-xs text-gray-400">Main game modification modules</p>
          </div>
        </div>

        <div className="space-y-3">
          <ModToggle 
            label="Auto Winstreak" 
            isActive={settings.autoWinstreak} 
            onToggle={() => onToggle('autoWinstreak')} 
          />
          <ModToggle 
            label="Get Team Pro" 
            isActive={settings.getTeamPro} 
            onToggle={() => onToggle('getTeamPro')} 
          />
          <ModToggle 
            label="Get Enemy Noob" 
            isActive={settings.getEnemyNoob} 
            onToggle={() => onToggle('getEnemyNoob')} 
          />
          <ModToggle 
            label="Bypass Anti-Banned" 
            isActive={settings.bypassAntiBan} 
            onToggle={() => onToggle('bypassAntiBan')} 
            isCritical
          />
        </div>
      </div>

      <div className="vip-card rounded-2xl p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">System Logs</h3>
          <div className="px-2 py-0.5 bg-gray-800 rounded text-[10px] font-mono text-gray-500">REAL-TIME</div>
        </div>
        <div className="h-40 overflow-y-auto space-y-2 font-mono text-[11px] pr-2 custom-scrollbar">
          {logs.map(log => (
            <div key={log.id} className="flex gap-2">
              <span className="text-gray-600">[{log.timestamp}]</span>
              <span className={
                log.type === 'success' ? 'text-green-400' : 
                log.type === 'warning' ? 'text-amber-400' : 
                log.type === 'error' ? 'text-red-400' : 
                'text-blue-400'
              }>
                {log.message}
              </span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-600 italic">No logs available...</div>
          )}
        </div>
      </div>

      <a 
        href="https://play.google.com/store/apps/details?id=com.levelinfinite.sgameGlobal"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 bg-gradient-to-r from-[#D4AF37] to-amber-600 text-[#0a0e17] font-bold text-center rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        OPEN HONOR OF KINGS
      </a>
    </div>
  );
};

export default Dashboard;
