import React, { useState } from 'react';
import { MessageSquare, Plus, MoreVertical, Trash2, ChevronLeft, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../Logo';

export const Sidebar = ({ isOpen, toggleSidebar, conversations, activeId, onSelect, onNew, onDelete }) => {
  const { signOut, user } = useAuth();
  const [menuOpenId, setMenuOpenId] = useState(null);

  return (
    <div className={`fixed lg:relative z-40 h-full glass-panel !rounded-none !border-y-0 !border-l-0 transition-all duration-300 flex flex-col ${isOpen ? 'w-72 translate-x-0' : 'w-0 lg:w-0 -translate-x-full lg:translate-x-0 overflow-hidden'}`}>
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2 overflow-hidden">
          <Logo className="w-6 h-6 shrink-0" />
          <span className="font-bold tracking-widest text-sm whitespace-nowrap">FRIDAY</span>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-400 hover:text-white">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <button onClick={onNew} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-friday-accent/30 text-friday-accent hover:bg-friday-accent/10 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" /> New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar px-3 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2 mt-2">Recent</div>
        {conversations.map((conv) => (
          <div key={conv.id} className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${activeId === conv.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`} onClick={() => onSelect(conv.id)}>
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate flex-1">{conv.title}</span>
            <button onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === conv.id ? null : conv.id); }} className="opacity-0 group-hover:opacity-100 p-1 hover:text-white transition-opacity shrink-0">
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpenId === conv.id && (
              <div className="absolute right-2 top-10 glass-panel !rounded-lg border border-white/10 p-1 z-50 w-32 shadow-xl">
                <button onClick={(e) => { e.stopPropagation(); onDelete(conv.id); setMenuOpenId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-md text-left">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-white/5 flex items-center justify-between">
        <div className="text-xs text-gray-500 truncate mr-2">{user?.email}</div>
        <button onClick={signOut} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};