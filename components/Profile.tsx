
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6 pb-6">
      <div className="vip-card rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <div className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded text-[10px] text-[#D4AF37] font-bold">LIFETIME</div>
        </div>
        
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-[#D4AF37] p-1 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <img src="https://picsum.photos/200" className="w-full h-full rounded-full object-cover" alt="User" />
          </div>
          <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-[#0a0e17]" />
        </div>

        <h2 className="text-xl font-black italic tracking-tight">VIP_GHOST_USER</h2>
        <p className="text-sm text-[#D4AF37] font-mono mb-6 uppercase tracking-widest">Elite Member Tier</p>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-800">
            <div className="text-[10px] text-gray-500 font-bold uppercase">Wins</div>
            <div className="text-lg font-bold text-gray-100">1,248</div>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-800">
            <div className="text-[10px] text-gray-500 font-bold uppercase">WR</div>
            <div className="text-lg font-bold text-[#D4AF37]">98.2%</div>
          </div>
          <div className="bg-gray-900/50 p-3 rounded-xl border border-gray-800">
            <div className="text-[10px] text-gray-500 font-bold uppercase">Rank</div>
            <div className="text-lg font-bold text-gray-100 italic">MYTH</div>
          </div>
        </div>
      </div>

      <div className="vip-card rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Account Security</h3>
        
        <div className="flex items-center justify-between p-3 bg-gray-900/40 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-400">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="2"/></svg>
             </div>
             <div>
               <div className="text-xs font-bold">Encrypted ID</div>
               <div className="text-[10px] text-gray-500 font-mono">0x4F...77BC</div>
             </div>
          </div>
          <button className="text-[10px] font-bold text-[#D4AF37] uppercase">Refresh</button>
        </div>

        <div className="p-4 bg-red-500/5 border border-red-900/30 rounded-xl">
           <h4 className="text-xs font-bold text-red-500 mb-1">Safety Advisory</h4>
           <p className="text-[10px] text-gray-400">Keep 'Anti-Banned Bypass' enabled at all times. Avoid winstreaks longer than 25 in a single session to minimize pattern detection risk.</p>
        </div>

        <button className="w-full py-3 bg-gray-800 border border-gray-700 text-gray-400 text-sm font-bold rounded-xl hover:bg-gray-750 transition-colors uppercase tracking-widest">
          Logout System
        </button>
      </div>
    </div>
  );
};

export default Profile;
