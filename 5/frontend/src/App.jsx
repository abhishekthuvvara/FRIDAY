import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;