import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Upload, 
  BarChart3, 
  MessageCircle, 
  Search, 
  Settings,
  Scale,
  FileText
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Upload Documents', href: '/upload', icon: Upload },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Chatbot', href: '/chatbot', icon: MessageCircle },
  { name: 'Legal Research', href: '/research', icon: Search },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex items-center gap-3 p-6 border-b border-gray-200">
        <div className="p-2 bg-yellow-500 rounded-lg">
          <Scale className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-black">LegalAI</h1>
          <p className="text-sm text-gray-600">Assistant</p>
        </div>
      </div>

      <nav className="mt-6 px-3">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors ${
                  isActive 
                    ? 'bg-yellow-100 text-black border-r-4 border-yellow-500' 
                    : 'text-gray-700 hover:bg-yellow-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <div className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border border-yellow-300">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-yellow-700" />
            <span className="text-sm font-medium text-black">AI Processing</span>
          </div>
          <p className="text-xs text-gray-800">Ready to analyze your legal documents</p>
        </div>
      </div>
    </div>
  );
}