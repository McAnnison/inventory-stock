import React, { useState, useEffect } from 'react';
import { Camera, Maximize, AlertCircle, ScanLine } from 'lucide-react';
import { cn } from '../lib/utils';

export const Scan = () => {
  const [scanning, setScanning] = useState(true);
  const [detections, setDetections] = useState<any[]>([]);

  useEffect(() => {
    // Simulate AI detection process
    if (scanning) {
      const timer = setTimeout(() => {
        setDetections([
          { id: 1, label: 'Soda Can', conf: 0.98, box: 'top-10 left-4 w-16 h-24', color: 'border-green-500 text-green-500 bg-green-500/10' },
          { id: 2, label: 'Soda Can', conf: 0.98, box: 'top-10 left-24 w-16 h-24', color: 'border-green-500 text-green-500 bg-green-500/10' },
          { id: 3, label: 'Bread', conf: 0.85, box: 'top-48 left-4 w-32 h-16', color: 'border-green-500 text-green-500 bg-green-500/10' },
          { id: 4, label: 'Missing Item Alert', conf: null, box: 'top-72 left-24 w-32 h-20', color: 'border-red-500 text-red-500 bg-red-500/10', alert: true },
        ]);
        setScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  return (
    <div className="h-full flex flex-col bg-slate-900">
      
      {/* Camera Viewport Simulation */}
      <div className="relative flex-1 overflow-hidden bg-slate-800 flex items-center justify-center">
        {/* Placeholder background representing shelf */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
        
        {/* Scanning Overlay */}
        {scanning && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            <ScanLine className="w-16 h-16 text-blue-400 animate-pulse mb-4" />
            <div className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Analyzing Planogram...
            </div>
            
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] animate-[scan_2s_ease-in-out_infinite]" />
          </div>
        )}

        {/* Bounding Boxes */}
        {!scanning && detections.map(det => (
          <div 
            key={det.id}
            className={cn(
              "absolute border-2 rounded-sm transition-all duration-500 animate-in fade-in zoom-in-95",
              det.box,
              det.color
            )}
          >
            <div className={cn(
              "absolute -top-6 left-[-2px] px-1.5 py-0.5 text-[10px] font-bold text-white whitespace-nowrap rounded-t-sm",
              det.alert ? "bg-red-500" : "bg-green-500"
            )}>
              {det.label} {det.conf && `: ${det.conf}`}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white border-t border-slate-200 p-6 z-20 shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-slate-900 tracking-tight">Edge OCR & YOLOv8</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Real-time inference</p>
          </div>
          <button className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-600 hover:bg-slate-100 transition-colors">
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => { setScanning(true); setDetections([]); }}
            disabled={scanning}
            className="w-14 h-14 rounded bg-slate-900 flex items-center justify-center relative active:scale-95 transition-transform disabled:bg-slate-300 shadow-sm"
          >
            <div className={cn(
              "w-6 h-6 border-2 transition-colors",
              scanning ? "border-slate-400" : "border-white"
            )}></div>
          </button>
        </div>

        {!scanning && detections.some(d => d.alert) && (
          <div className="mt-6 bg-white border border-rose-200 p-3 rounded flex items-start space-x-3 shadow-sm">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">Planogram Mismatch</p>
              <p className="text-[11px] text-slate-600 mt-0.5 font-mono">#EVT-ERR missing item detected</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
