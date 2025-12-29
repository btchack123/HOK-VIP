
import React, { useState } from 'react';
import { ModSettings } from '../types';
import ModToggle from './ModToggle';

interface NetworkProps {
  settings: ModSettings;
  onToggle: (key: keyof ModSettings) => void;
}

interface Server {
  id: string;
  name: string;
  ping: string;
  status: string;
  color: string;
  history: number[]; // Last 5 ping values in ms
  connState: 'connected' | 'unstable' | 'disconnected';
}

const PingSparkline: React.FC<{ history: number[]; colorClass: string }> = ({ history, colorClass }) => {
  const width = 50;
  const height = 14;
  const max = Math.max(...history, 100);
  const min = Math.min(...history, 0);
  const range = max - min || 1;

  const points = history.map((val, i) => {
    const x = (i / (history.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const strokeColor = colorClass.includes('green') ? '#4ade80' : 
                      colorClass.includes('amber') ? '#fbbf24' : 
                      colorClass.includes('blue') ? '#60a5fa' : '#D4AF37';

  return (
    <svg width={width} height={height} className="opacity-90">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="opacity-20 blur-[1px]"
      />
    </svg>
  );
};

const Network: React.FC<NetworkProps> = ({ settings, onToggle }) => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const servers: Server[] = [
    { id: 'id', name: 'Indonesia-VIP', ping: '9ms', status: 'Ultra Low', color: 'text-green-400', history: [12, 10, 8, 11, 9], connState: 'connected' },
    { id: 'jp', name: 'Japan-VIP', ping: '15ms', status: 'Fast', color: 'text-[#D4AF37]', history: [18, 14, 16, 15, 15], connState: 'connected' },
    { id: 'us', name: 'United States', ping: '32ms', status: 'Stable', color: 'text-amber-400', history: [45, 38, 30, 35, 32], connState: 'unstable' },
    { id: 'fr', name: 'French-VIP', ping: '28ms', status: 'Optimized', color: 'text-blue-400', history: [35, 32, 29, 30, 28], connState: 'connected' },
    { id: 'de', name: 'Germany-VIP', ping: '38ms', status: 'Stable', color: 'text-green-400', history: [42, 40, 35, 39, 38], connState: 'connected' },
    { id: 'br', name: 'Brazil-VIP', ping: '156ms', status: 'VIP Path', color: 'text-amber-500', history: [180, 165, 170, 150, 156], connState: 'unstable' },
    { id: 'kr', name: 'S. Korea-VIP', ping: '12ms', status: 'Direct', color: 'text-green-400', history: [15, 11, 13, 10, 12], connState: 'connected' },
    { id: 'ru', name: 'Russia-VIP', ping: '45ms', status: 'Secure', color: 'text-blue-400', history: [55, 48, 50, 42, 45], connState: 'disconnected' },
  ];

  const handleConfirm = () => {
    setSelectedServer(null);
  };

  const getStatusDotColor = (state: Server['connState']) => {
    switch (state) {
      case 'connected': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
      case 'unstable': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse';
      case 'disconnected': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 pb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="vip-card rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase italic tracking-tight">VIP Server Tuner</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Protocol: SSH Tunneling Enabled</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-950/40 rounded-xl border border-gray-800/60 shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">Global Nodes</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-[8px] font-bold text-gray-500 uppercase">Live Stats</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {servers.map((server) => (
                <div 
                  key={server.id} 
                  onClick={() => setSelectedServer(server)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-[#D4AF37]/50 active:scale-95 flex flex-col items-center justify-center text-center ${
                    server.id === 'jp' 
                      ? 'bg-[#D4AF37]/5 border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                      : 'bg-gray-800/40 border-gray-700/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 justify-center w-full mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(server.connState)}`} />
                    <span className={`text-[10px] font-black uppercase truncate ${server.id === 'jp' ? 'text-[#D4AF37]' : 'text-gray-200'}`}>
                      {server.name}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center mb-2">
                    <span className={`text-[11px] font-mono font-bold leading-none ${server.color}`}>
                      {server.ping}
                    </span>
                    <span className="text-[7px] text-gray-500 uppercase font-black tracking-tighter mt-1">
                      {server.status}
                    </span>
                  </div>

                  <div className="w-full pt-2 border-t border-gray-700/30 flex flex-col items-center">
                    <PingSparkline history={server.history} colorClass={server.color} />
                    <div className="flex justify-between w-full px-0.5 mt-1 opacity-30">
                      {server.history.map((p, idx) => (
                        <span key={idx} className="text-[6px] font-mono leading-none">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <ModToggle 
              label="VPN Server Low Tier" 
              isActive={settings.vpnLowTier} 
              onToggle={() => onToggle('vpnLowTier')} 
            />
            <ModToggle 
              label="VPN Server Low Normal" 
              isActive={settings.vpnLowNormal} 
              onToggle={() => onToggle('vpnLowNormal')} 
            />
          </div>
        </div>
      </div>

      <div className="vip-card rounded-2xl p-5 border-l-4 border-l-[#D4AF37] shadow-lg">
        <h3 className="text-xs font-bold mb-4 text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          Advanced Protocol Logs
        </h3>
        <div className="space-y-2.5 font-mono text-[10px]">
          <div className="flex justify-between border-b border-gray-800/50 pb-1.5">
            <span className="text-gray-500 uppercase tracking-tighter">Current Protocol</span>
            <span className="text-[#D4AF37] font-bold">SSH VIP v4.2</span>
          </div>
          <div className="flex justify-between border-b border-gray-800/50 pb-1.5">
            <span className="text-gray-500 uppercase tracking-tighter">Handshake Mode</span>
            <span className="text-green-400">SECURE RSA-4096</span>
          </div>
          <div className="flex justify-between border-b border-gray-800/50 pb-1.5">
            <span className="text-gray-500 uppercase tracking-tighter">Tunneling Port</span>
            <span className="text-blue-400">443 / 8080 (AUTO)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 uppercase tracking-tighter">Server Auth</span>
            <span className="text-gray-200 italic font-medium">Public_200_Authorized</span>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="flex items-center gap-3 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
          <div className="text-amber-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Changing nodes will temporarily disconnect your current session. High-tier SSH protocols are automatically rotated to prevent pattern detection.
          </p>
        </div>
      </div>

      {selectedServer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="vip-card w-full max-w-xs rounded-[2rem] p-8 shadow-2xl border border-[#D4AF37]/50 animate-in zoom-in-95 slide-in-from-top-4 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center mb-6 border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] transform rotate-12">
                <svg className="w-10 h-10 text-[#D4AF37] -rotate-12 animate-pulse-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-3 tracking-tight italic gold-glow uppercase">Connect to {selectedServer.name}?</h3>
              <p className="text-xs text-gray-400 mb-8 leading-relaxed max-w-[200px]">
                Initializing secure encrypted tunnel. Current game traffic will be re-routed through <span className="text-[#D4AF37] font-bold">{selectedServer.ping}</span> latency path.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={handleConfirm}
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-amber-600 text-[#0a0e17] text-sm font-black rounded-2xl shadow-lg shadow-[#D4AF37]/30 active:scale-95 transition-all uppercase tracking-widest"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => setSelectedServer(null)}
                  className="w-full py-4 bg-gray-900/80 text-gray-500 text-sm font-bold rounded-2xl border border-gray-800 hover:bg-gray-800 transition-colors uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Network;
