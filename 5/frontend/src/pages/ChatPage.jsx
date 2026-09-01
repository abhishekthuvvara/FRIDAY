import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import Logo from '../components/Logo';
import { Sidebar } from '../components/chat/Sidebar';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageBubble } from '../components/chat/MessageBubble';
import { EnergyCore } from '../components/chat/EnergyCore';

// MOCK DATA FOR PHASE 5 UI TESTING
const MOCK_CONVERSATIONS = [
  { id: '1', title: 'Python Decorators' },
  { id: '2', title: 'Debug FastAPI Route' },
  { id: '3', title: 'Data Analysis with Pandas' }
];

const MOCK_MESSAGES = {
  '1': [
    { id: 'm1', role: 'user', content: 'Can you explain how Python decorators work?' },
    { id: 'm2', role: 'assistant', content: 'A decorator in Python is a function that takes another function and extends the behavior of the latter function without explicitly modifying it.\n\nHere is a simple example:\n\n```python\ndef my_decorator(func):\n    def wrapper():\n        print("Something is happening before the function is called.")\n        func()\n        print("Something is happening after the function is called.")\n    return wrapper\n```\n\nWe will implement full Markdown and Code Block rendering in Phase 8.' }
  ]
};

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('1');
  const [messages, setMessages] = useState(MOCK_MESSAGES['1'] || []);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // Show button if we are scrolled up more than 100px from the bottom
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newConv = { id: newId, title: 'New Conversation' };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newId);
    setMessages([]);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleDeleteChat = (id) => {
    setConversations(conversations.filter(c => c.id !== id));
    if (activeConvId === id) {
      setActiveConvId(null);
      setMessages([]);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isGenerating) return;
    
    const newUserMsg = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsGenerating(true);

    // MOCK AI RESPONSE FOR UI TESTING
    setTimeout(() => {
      const newAiMsg = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I am FRIDAY. This is a mock response for Phase 5. The backend Gemini API integration will be implemented in Phase 6. \n\nYou just said: " + newUserMsg.content 
      };
      setMessages(prev => [...prev, newAiMsg]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-friday-bg overflow-hidden relative">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        conversations={conversations}
        activeId={activeConvId}
        onSelect={(id) => {
          setActiveConvId(id);
          setMessages(MOCK_MESSAGES[id] || []);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }}
        onNew={handleNewChat}
        onDelete={handleDeleteChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <EnergyCore />
        
        {/* Header */}
        <header className="absolute top-0 w-full z-10 glass-panel !rounded-none !border-t-0 !border-x-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-widest leading-none">FRIDAY</span>
                <span className="text-[10px] text-friday-accent leading-none mt-1">AI Coding Assistant</span>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Scroll Area */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pt-24 pb-32 px-4 sm:px-6 relative z-0 hide-scrollbar scroll-smooth"
        >
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-32 opacity-50">
                <Logo className="w-16 h-16 mb-6" />
                <h3 className="text-xl font-medium text-white mb-2">How can I help you code today?</h3>
                <p className="text-sm text-gray-400">Ask a Python question to begin.</p>
              </div>
            ) : (
              messages.map(msg => (
                <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
              ))
            )}
            
            {isGenerating && (
              <div className="flex items-center gap-3 text-sm text-friday-accent animate-pulse">
                <Logo className="w-5 h-5" /> FRIDAY is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button 
            onClick={scrollToBottom}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 p-2 rounded-full bg-friday-surface border border-friday-accent/30 text-friday-accent hover:bg-friday-accent/10 transition-all z-20 shadow-glow"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        )}

        {/* Input Area */}
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-friday-bg via-friday-bg to-transparent z-10">
          <ChatInput 
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            disabled={isGenerating}
          />
        </div>
        
      </div>
    </div>
  );
};

export default ChatPage;