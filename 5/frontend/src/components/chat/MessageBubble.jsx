import React from 'react';
import Logo from '../Logo';
import { User } from 'lucide-react';

export const MessageBubble = ({ role, content }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex items-start gap-4 w-full ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isUser ? 'bg-friday-surface border-white/10 text-gray-400' : 'bg-friday-accent/10 border-friday-accent/30'}`}>
        {isUser ? <User className="w-4 h-4" /> : <Logo className="w-5 h-5" />}
      </div>
      
      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm whitespace-pre-wrap ${isUser ? 'bg-friday-surface/80 border border-white/5 rounded-tr-none text-gray-200' : 'glass-panel rounded-tl-none glow-border text-gray-300'}`}>
        {content}
      </div>
    </div>
  );
};