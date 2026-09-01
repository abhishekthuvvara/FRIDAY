import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogOut } from 'lucide-react';
import Logo from '../components/Logo';

const ChatPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-friday-bg text-gray-200 flex flex-col">
      <nav className="glass-panel !rounded-none !border-t-0 !border-x-0 !border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold text-white tracking-widest">FRIDAY CHAT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{user?.email}</span>
          <button 
            onClick={signOut} 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-friday-surface border border-white/10 hover:bg-white/5 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="glass-panel p-8 text-center max-w-lg w-full glow-border">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to FRIDAY</h2>
          <p className="text-gray-400 mb-6">Phase 4 complete. The Supabase database schema has been initialized.</p>
          <div className="bg-friday-surface/50 border border-white/10 rounded-lg p-4 font-mono text-sm text-friday-accent">
            Run the SQL migration in database/migrations/01_initial_schema.sql via your Supabase dashboard to proceed to Phase 5.
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
