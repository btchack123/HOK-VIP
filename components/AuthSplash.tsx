
import React, { useState, useEffect } from 'react';

interface AuthSplashProps {
  onComplete: () => void;
}

const AuthSplash: React.FC<AuthSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing HOK VIP Core...");

  useEffect(() => {
    const sequence = [
      { p: 15, s: "Connecting to secure backend..." },
      { p: 35, s: "Authentication Handshake: 200 OK" },
      { p: 60, s: "Loading Module Manifest..." },
      { p: 85, s: "Bypassing Security Protocols..." },
      { p: 100, s: "Welcome, VIP Member." },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < sequence.length) {
        const { p, s } = sequence[currentStep];
        setProgress(p);
        setStatus(s);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="h-screen bg-[#0a0e17] flex flex-col items-center justify-center p-8">
      <div className="mb-12 relative">
        <div className="w-24 h-24 border-4 border-[#D4AF37] rounded-2xl flex items-center justify-center transform rotate-45 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
          <span className="text-4xl font-black text-[#D4AF37] -rotate-45 italic">VIP</span>
        </div>
        <div className="absolute inset-0 bg-[#D4AF37]/10 blur-3xl rounded-full" />
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="flex justify-between text-xs font-mono text-[#D4AF37] tracking-widest">
          <span>{status}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-200 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-20 text-[10px] text-gray-600 font-mono tracking-tighter uppercase text-center">
        Secure Auth Token: Public_Network_200_Authorized<br/>
        Hardware ID Verified | Encrypted Tunnel Established
      </div>
    </div>
  );
};

export default AuthSplash;
