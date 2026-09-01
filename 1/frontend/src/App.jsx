import React, { useEffect, useState } from 'react';

function App() {
  const [apiStatus, setApiStatus] = useState('Checking systems...');

  useEffect(() => {
    fetch('http://localhost:8000/api/health')
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('Backend offline'));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-friday-bg">
      <div className="glass-panel p-8 max-w-md w-full text-center glow-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-friday-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">FRIDAY</h1>
        <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest">AI  python Coding Assistant</p>
        
        <div className="bg-friday-surface/50 border border-white/10 rounded-lg p-4 font-mono text-sm text-friday-accent flex items-center justify-center gap-2">
          <div className={`w-2 h-2 rounded-full ${apiStatus.includes('Online') ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
          {apiStatus}
        </div>
      </div>
    </div>
  );
}

export default App;
