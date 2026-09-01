import React from 'react';
import Logo from '../components/Logo';
import { Terminal, Bug, BookOpen, Repeat, GraduationCap, Layers, ArrowRight, Code2 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="glass-panel p-6 hover:glow-border transition-all duration-300 group">
    <div className="w-12 h-12 rounded-lg bg-friday-surface/80 border border-friday-accent/20 flex items-center justify-center mb-4 group-hover:bg-friday-accent/10 transition-colors">
      <Icon className="w-6 h-6 text-friday-accent" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const features = [
    { icon: Terminal, title: "Code Generation", description: "Generate Python code from natural-language requirements instantly." },
    { icon: Bug, title: "Debugging", description: "Identify errors and receive corrected code with detailed explanations." },
    { icon: BookOpen, title: "Code Explanation", description: "Explain complex Python code in simple or advanced terminology." },
    { icon: Repeat, title: "Code Rewriting", description: "Refactor and rewrite code according to your specific requirements." },
    { icon: GraduationCap, title: "Learning Assistant", description: "Master Python from beginner concepts to advanced architecture." },
    { icon: Layers, title: "Library Assistance", description: "Navigate and utilize Python libraries and frameworks effectively." }
  ];

  return (
    <div className="min-h-screen bg-friday-bg text-gray-200 overflow-y-auto">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel !rounded-none !border-t-0 !border-x-0 !border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold text-white tracking-widest">FRIDAY</span>
        </div>
        <button className="px-6 py-2 rounded-full bg-friday-surface border border-friday-accent/30 text-friday-accent hover:bg-friday-accent/10 transition-all text-sm font-medium">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-friday-accent/10 border border-friday-accent/20 text-friday-accent text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-friday-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-friday-accent"></span>
              </span>
              FRIDAY Systems Online
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Your AI <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-friday-accent to-blue-500">
                Coding Assistant
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0">
              Write, understand, debug, and improve Python code with FRIDAY. Designed for developers, built for performance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-friday-accent text-friday-bg font-semibold flex items-center justify-center gap-2 hover:bg-[#00cce6] transition-colors">
                <Code2 className="w-5 h-5" />
                Start Coding
              </button>
              <button className="w-full sm:w-auto px-8 py-3 rounded-lg glass-panel hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group">
                Learn Python
                <ArrowRight className="w-4 h-4 text-friday-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Demo Chat */}
          <div className="flex-1 w-full max-w-lg">
            <div className="glass-panel p-4 flex flex-col gap-4 glow-border">
              <div className="flex items-start gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-friday-surface flex items-center justify-center shrink-0">
                  <span className="text-xs">U</span>
                </div>
                <div className="bg-friday-surface/50 border border-white/5 rounded-2xl rounded-tl-none p-3 text-sm text-gray-300 w-full">
                  Debug this Python code for me. It's throwing a KeyError.
                </div>
              </div>
              
              <div className="flex items-start gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-friday-accent/10 flex items-center justify-center shrink-0 border border-friday-accent/20">
                  <Logo className="w-5 h-5" />
                </div>
                <div className="bg-friday-surface/80 border border-friday-accent/20 rounded-2xl rounded-tr-none p-4 text-sm text-gray-300 w-full shadow-glow">
                  <p className="mb-3">I've identified the issue. You are trying to access a dictionary key that doesn't exist before checking for it. Here's the corrected version:</p>
                  <div className="bg-[#05070D] rounded-lg p-3 font-mono text-xs text-blue-300 border border-white/10">
                    # Use the .get() method instead
value = my_dict.get('key', 'default_value')
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
