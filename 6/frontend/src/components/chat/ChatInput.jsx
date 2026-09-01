import React, { useRef, useEffect } from 'react';
export const ChatInput = ({ value, onChange, onSend, disabled }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };
  return (
    <div className="relative glass-panel p-2 flex items-end gap-2 glow-border mx-auto max-w-4xl w-full">
      <textarea ref={textareaRef} value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={handleKeyDown}
        placeholder="Ask FRIDAY to write, explain, debug, or improve Python..."
        className="w-full bg-transparent text-gray-200 placeholder-gray-500 p-3 focus:outline-none resize-none max-h-[200px] min-h-[48px] overflow-y-auto"
        rows={1} disabled={disabled}
      />
      <button onClick={onSend} disabled={!value.trim() || disabled}
        className="p-3 mb-1 mr-1 rounded-xl bg-friday-accent text-friday-bg hover:bg-[#00cce6] disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-400 transition-colors shrink-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};