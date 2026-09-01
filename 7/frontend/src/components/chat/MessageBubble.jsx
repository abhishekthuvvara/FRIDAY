import React from 'react';
import Logo from '../Logo';
import { User, CheckCircle2 } from 'lucide-react';

export const MessageBubble = ({ role, content, isValidated }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex items-start gap-4 w-full ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isUser ? 'bg-friday-surface border-white/10 text-gray-400' : 'bg-friday-accent/10 border-friday-accent/30'}`}>
        {isUser ? <User className="w-4 h-4" /> : <Logo className="w-5 h-5" />}
      </div>
      
      <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]">
        <div className={`rounded-2xl p-4 text-sm whitespace-pre-wrap ${isUser ? 'bg-friday-surface/80 border border-white/5 rounded-tr-none text-gray-200' : 'glass-panel rounded-tl-none glow-border text-gray-300'}`}>
          {content}
        </div>
        {isValidated && !isUser && (
          <div className="flex items-center gap-1 text-[10px] text-green-400 ml-1 mt-1 font-mono">
            <CheckCircle2 className="w-3 h-3" /> Syntax Validated
          </div>
        )}
      </div>
    </div>
  );
};