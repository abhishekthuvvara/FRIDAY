import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import {
  Terminal,
  Bug,
  BookOpen,
  Repeat,
  GraduationCap,
  Layers,
  ArrowRight,
  Code2,
} from "lucide-react";
import { AuthModal } from "../components/AuthModal";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="glass-panel p-6 hover:glow-border transition-all duration-300 group">
    <div className="w-12 h-12 rounded-lg bg-friday-surface/80 border border-friday-accent/20 flex items-center justify-center mb-4 group-hover:bg-friday-accent/10 transition-colors">
      <Icon className="w-6 h-6 text-friday-accent" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAction = () => {
    if (user) {
      navigate("/chat");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-friday-bg text-gray-200 overflow-y-auto">
      <nav
        aria-label="Main Navigation"
        className="fixed top-0 w-full z-50 glass-panel !rounded-none !border-t-0 !border-x-0 !border-white/10 px-6 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold text-white tracking-widest">
            FRIDAY
          </span>
        </div>
        <button
          aria-label={user ? "Open Chat" : "Sign in"}
          onClick={handleAction}
          className="px-6 py-2 rounded-full bg-friday-surface border border-friday-accent/30 text-friday-accent hover:bg-friday-accent/10 transition-all text-sm font-medium"
        >
          {user ? "Open Chat" : "Sign In"}
        </button>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Your AI <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-friday-accent to-blue-500">
                Coding Assistant
              </span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">
              Write, understand, debug, and improve Python code with FRIDAY.
              Designed for developers, built for performance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                aria-label="Start Coding"
                onClick={handleAction}
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-friday-accent text-friday-bg font-semibold flex items-center justify-center gap-2 hover:bg-[#00cce6] transition-colors"
              >
                <Code2 className="w-5 h-5" /> Start Coding
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal Overlay */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default LandingPage;
