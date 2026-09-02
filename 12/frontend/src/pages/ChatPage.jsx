import React, { useState, useRef, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import Logo from "../components/Logo";
import { Sidebar } from "../components/chat/Sidebar";
import { ChatInput } from "../components/chat/ChatInput";
import { MessageBubble } from "../components/chat/MessageBubble";
import { EnergyCore } from "../components/chat/EnergyCore";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const ChatPage = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
  };

  // Load Database Conversations
  useEffect(() => {
    if (!user) return;
    const loadConversations = async () => {
      const { data } = await supabase
        .from("conversations")
        .select("*")
        .order("updated_at", { ascending: false });
      if (data) setConversations(data);
    };
    loadConversations();
  }, [user]);

  // Load Database Messages for Active Conversation
  useEffect(() => {
    if (!activeConvId) {
      setMessages([]);
      return;
    }
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", activeConvId)
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
    };
    loadMessages();
  }, [activeConvId]);

  const handleNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleDeleteChat = async (id) => {
    await supabase.from("conversations").delete().eq("id", id);
    setConversations(conversations.filter((c) => c.id !== id));
    if (activeConvId === id) {
      setActiveConvId(null);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating || !user) return;

    let currentConvId = activeConvId;
    const userContent = inputValue;
    setInputValue("");
    setIsGenerating(true);

    // 1. Create conversation if new
    if (!currentConvId) {
      const { data } = await supabase
        .from("conversations")
        .insert([
          {
            user_id: user.id,
            title:
              userContent.slice(0, 30) + (userContent.length > 30 ? "..." : ""),
          },
        ])
        .select()
        .single();
      if (data) {
        currentConvId = data.id;
        setConversations([data, ...conversations]);
        setActiveConvId(currentConvId);
      } else {
        setIsGenerating(false);
        return;
      }
    }

    // 2. Optimistic UI & DB Insert for User Message
    const tempUserMsg = {
      id: Date.now().toString(),
      role: "user",
      content: userContent,
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    await supabase
      .from("messages")
      .insert([
        {
          conversation_id: currentConvId,
          user_id: user.id,
          role: "user",
          content: userContent,
        },
      ]);

    try {
      // 3. Prepare payload for Gemini API
      const apiMessages = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      apiMessages.push({ role: "user", content: userContent });

      // 4. Get the current session token for authenticated backend requests
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      // 5. Send request to FastAPI Backend
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error("API Request Failed");
      const data = await res.json();

      // 6. Save AI response to DB & Update UI
      await supabase
        .from("messages")
        .insert([
          {
            conversation_id: currentConvId,
            user_id: user.id,
            role: "assistant",
            content: data.response,
          },
        ]);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.response,
        },
      ]);
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", currentConvId);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg =
        "FRIDAY Backend is unreachable. Please verify your FastAPI server is running and GEMINI_API_KEY is configured.";
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: errorMsg },
      ]);
    } finally {
      setIsGenerating(false);
    }
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
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }}
        onNew={handleNewChat}
        onDelete={handleDeleteChat}
      />

      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <EnergyCore />
        <header className="absolute top-0 w-full z-10 glass-panel !rounded-none !border-t-0 !border-x-0 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-widest leading-none">
                  FRIDAY
                </span>
                <span className="text-[10px] text-friday-accent leading-none mt-1">
                  AI Coding Assistant
                </span>
              </div>
            </div>
          </div>
        </header>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pt-24 pb-32 px-4 sm:px-6 relative z-0 hide-scrollbar scroll-smooth"
        >
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-32 opacity-50">
                <Logo className="w-16 h-16 mb-6" />
                <h3 className="text-xl font-medium text-white mb-2">
                  How can I help you code today?
                </h3>
                <p className="text-sm text-gray-400">
                  Ask a Python question to begin.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                />
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

        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 p-2 rounded-full bg-friday-surface border border-friday-accent/30 text-friday-accent hover:bg-friday-accent/10 transition-all z-20 shadow-glow"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        )}

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
