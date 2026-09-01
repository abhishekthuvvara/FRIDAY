import React, { useState } from "react";
import { X, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";

export const AuthModal = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        onClose(); // Close modal on success, App.jsx will automatically route to /chat
      } else {
        await signUpWithEmail(email, password);
        setMessage("Account created! You can now log in.");
        setIsLogin(true); // Switch to login view
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-8 glass-panel glow-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-8">
          <Logo className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold text-white tracking-widest">
            {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {isLogin
              ? "Sign in to continue to FRIDAY"
              : "Register to start using FRIDAY"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-friday-surface border border-white/10 rounded-lg py-3 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-friday-accent transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-friday-surface border border-white/10 rounded-lg py-3 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-friday-accent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-lg bg-friday-accent text-friday-bg font-semibold hover:bg-[#00cce6] transition-colors disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isLogin
                ? "Sign In with Email"
                : "Sign Up"}
          </button>
        </form>

        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="shrink-0 px-4 text-xs text-gray-500 uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-white/10 bg-friday-surface hover:bg-white/5 transition-colors text-sm font-medium text-gray-200"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-friday-accent hover:underline font-medium"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};
