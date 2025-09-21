import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Scale, 
  Search, 
  TrendingUp,
  Shield,
  Building2,
  Copyright,
  BarChart3,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Document Review',
    description: 'AI-powered analysis of contracts, agreements, and legal documents',
    color: 'bg-yellow-500',
    stats: '2.3k Documents'
  },
  {
    icon: Scale,
    title: 'Contract Analysis',
    description: 'Automated clause extraction, risk assessment, and compliance checking',
    color: 'bg-black',
    stats: '847 Contracts'
  },
  {
    icon: Search,
    title: 'Legal Research',
    description: 'Comprehensive case law research and precedent analysis',
    color: 'bg-gray-800',
    stats: '15k Cases'
  },
  {
    icon: TrendingUp,
    title: 'Outcome Prediction',
    description: 'Predictive analytics for legal case outcomes and risk assessment',
    color: 'bg-yellow-600',
    stats: '89% Accuracy'
  }
];

const useCases = [
  { icon: BarChart3, name: 'Legal Analytics', description: 'Data-driven insights', color: 'yellow' },
  { icon: Shield, name: 'Compliance', description: 'Regulatory adherence', color: 'black' },
  { icon: Building2, name: 'M&A Support', description: 'Due diligence automation', color: 'gray' },
  { icon: Copyright, name: 'IP Management', description: 'Intellectual property tracking', color: 'yellow' },
];

const recentActivity = [
  { type: 'success', message: 'Contract analysis completed for Tesla Inc. Agreement', time: '2 minutes ago' },
  { type: 'warning', message: 'Risk identified in liability clause - Section 4.2', time: '15 minutes ago' },
  { type: 'success', message: 'Legal research query processed - 47 relevant cases found', time: '1 hour ago' },
  { type: 'success', message: 'Document upload completed - NDA template analyzed', time: '3 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-black to-gray-900 rounded-xl p-8 text-white mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Generative AI in Legal Domain</h1>
        <p className="text-xl text-gray-200 mb-6 max-w-2xl">
          Transform your legal workflows with AI-powered document analysis, contract review, 
          and predictive insights that enhance decision-making and reduce risk.
        </p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-yellow-500 text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition-colors"
          >
            Watch Demo
          </motion.button>
        </div>
      </motion.div> */}

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{feature.description}</p>
            <div className="text-2xl font-bold text-black">{feature.stats}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Use Cases */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-black mb-6">AI Use Cases in Legal Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-lg transition-colors cursor-pointer ${
                  useCase.color === 'yellow' ? 'border-yellow-300 hover:border-yellow-500 hover:bg-yellow-50' :
                  useCase.color === 'black' ? 'border-gray-300 hover:border-black hover:bg-gray-50' :
                  'border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <useCase.icon className={`w-5 h-5 ${useCase.color === 'yellow' ? 'text-yellow-600' : useCase.color === 'black' ? 'text-black' : 'text-gray-700'}`} />
                  <h3 className="font-semibold text-black">{useCase.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-black mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                {activity.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-black mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-black mb-1">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}