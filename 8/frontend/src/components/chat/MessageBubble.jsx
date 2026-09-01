import React, { useState } from 'react';
import Logo from '../Logo';
import { User, CheckCircle2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="relative my-4 rounded-lg overflow-hidden border border-white/10 bg-[#1E1E1E]">
        <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10">
          <span className="text-xs text-gray-400 font-mono lowercase">{language}</span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem' }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }
  return (
    <code className="bg-white/10 text-friday-accent px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
      {children}
    </code>
  );
};

export const MessageBubble = ({ role, content, isValidated }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`flex items-start gap-4 w-full ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isUser ? 'bg-friday-surface border-white/10 text-gray-400' : 'bg-friday-accent/10 border-friday-accent/30'}`}>
        {isUser ? <User className="w-4 h-4" /> : <Logo className="w-5 h-5" />}
      </div>
      
      <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] w-full">
        <div className={`rounded-2xl p-4 text-sm ${isUser ? 'bg-friday-surface/80 border border-white/5 rounded-tr-none text-gray-200 whitespace-pre-wrap' : 'glass-panel rounded-tl-none glow-border text-gray-300 overflow-hidden'}`}>
          {isUser ? (
            content
          ) : (
            <div className="markdown-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlock,
                  p: ({children}) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
                  ul: ({children}) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
                  li: ({children}) => <li className="mb-1">{children}</li>,
                  h1: ({children}) => <h1 className="text-xl font-bold text-white mb-4 mt-6">{children}</h1>,
                  h2: ({children}) => <h2 className="text-lg font-bold text-white mb-3 mt-5">{children}</h2>,
                  h3: ({children}) => <h3 className="text-base font-bold text-white mb-2 mt-4">{children}</h3>,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
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