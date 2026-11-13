import React from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { deviceFrame, setDeviceFrame } = useAppStore();

  if (deviceFrame === 'fullscreen') {
    return (
      <div className="w-full min-h-screen bg-[#f4f5f8] flex flex-col items-center justify-start">
        {/* Top Control Bar */}
        <div className="w-full max-w-md bg-gray-900 text-white text-xs px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <span className="font-bold text-orange-400 text-[11px] uppercase tracking-wider">
            Høvåg Menighet App
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDeviceFrame('iphone')}
              className="px-2.5 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3 h-3 text-orange-400" />
              <span>Mobilramme</span>
            </button>
          </div>
        </div>

        <div className="w-full max-w-md min-h-screen bg-[#f4f5f8] relative shadow-xl">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-6 px-2 flex flex-col items-center justify-center font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Device Switcher Bar */}
      <div className="mb-4 bg-slate-900/90 border border-slate-800 p-1.5 rounded-full flex items-center gap-2 backdrop-blur-md shadow-xl">
        <button
          onClick={() => setDeviceFrame('iphone')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
            deviceFrame === 'iphone'
              ? 'bg-orange-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>iOS iPhone</span>
        </button>

        <button
          onClick={() => setDeviceFrame('android')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
            deviceFrame === 'android'
              ? 'bg-orange-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span>Android</span>
        </button>

        <button
          onClick={() => setDeviceFrame('fullscreen')}
          className="px-3 py-1.5 rounded-full text-xs font-extrabold text-slate-400 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Fullskjerm</span>
        </button>
      </div>

      {/* Realistic Mobile Device Container */}
      <div className="relative w-full max-w-[400px] h-[840px] bg-black rounded-[52px] p-3 shadow-2xl shadow-orange-950/20 ring-1 ring-slate-800 border-[3px] border-slate-700/80 flex flex-col overflow-hidden">
        {/* iPhone Dynamic Island or Android Camera Hole */}
        {deviceFrame === 'iphone' ? (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end px-2 gap-1 border border-slate-800/50">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            <div className="w-2 h-2 rounded-full bg-blue-950/60" />
          </div>
        ) : (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 ring-2 ring-slate-800" />
        )}

        {/* Screen Bezel Wrapper */}
        <div className="w-full h-full bg-[#f4f5f8] rounded-[42px] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="h-10 bg-white px-6 flex items-center justify-between text-xs font-bold text-gray-900 shrink-0 select-none z-40 border-b border-gray-100/50">
            <span className="text-[11px] font-extrabold tracking-tight">09:41</span>
            <div className="flex items-center gap-1.5 text-gray-800">
              <Signal className="w-3 h-3 fill-current" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>

          {/* Scrollable Screen Content Container */}
          <div className="flex-1 overflow-hidden relative flex flex-col h-full">
            {children}
          </div>

          {/* Home Indicator Bar (iOS) */}
          {deviceFrame === 'iphone' && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full z-50 pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};
