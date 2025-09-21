import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import DocumentUpload from './pages/DocumentUpload';
import Analytics from './pages/Analytics';
import Chatbot from './pages/Chatbot';
import LegalResearch from './pages/LegalResearch';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<DocumentUpload />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/research" element={<LegalResearch />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;