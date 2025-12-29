
import React from 'react';

interface ModToggleProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  isCritical?: boolean;
}

const ModToggle: React.FC<ModToggleProps> = ({ label, isActive, onToggle, isCritical }) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-xl transition-all border ${
        isActive 
          ? 'bg-[#D4AF37]/5 border-[#D4AF37]/30 shadow-[inset_0_0_15px_rgba(212,175,55,0.05)]' 
          : 'bg-gray-800/40 border-gray-700/50'
      }`}
      onClick={onToggle}
    >
      <div className="flex flex-col">
        <span className={`text-sm font-semibold ${isActive ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
          {label}
        </span>
        {isCritical && (
          <span className="text-[10px] text-red-500 font-bold uppercase mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Security Core
          </span>
        )}
      </div>
      
      <div className="relative inline-flex items-center cursor-pointer">
        <div className={`w-12 h-6 rounded-full transition-colors ${isActive ? 'bg-[#D4AF37]' : 'bg-gray-700'}`}>
          <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform transform ${isActive ? 'translate-x-6 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default ModToggle;
