import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const riskScoreData = [
  { name: 'Contract A', riskScore: 85, compliance: 92 },
  { name: 'Contract B', riskScore: 65, compliance: 88 },
  { name: 'Contract C', riskScore: 45, compliance: 95 },
  { name: 'Contract D', riskScore: 75, compliance: 78 },
  { name: 'Contract E', riskScore: 35, compliance: 98 },
];

const clauseBreakdownData = [
  { name: 'Payment Terms', value: 35, color: '#EAB308' },
  { name: 'Liability', value: 25, color: '#000000' },
  { name: 'Termination', value: 20, color: '#374151' },
  { name: 'IP Rights', value: 15, color: '#FDE047' },
  { name: 'Other', value: 5, color: '#6B7280' },
];

const outcomeData = [
  { month: 'Jan', predictions: 78, actual: 82 },
  { month: 'Feb', predictions: 85, actual: 79 },
  { month: 'Mar', predictions: 92, actual: 88 },
  { month: 'Apr', predictions: 88, actual: 91 },
  { month: 'May', predictions: 95, actual: 94 },
  { month: 'Jun', predictions: 91, actual: 89 },
];

const kpiCards = [
  {
    title: 'Risk Score Average',
    value: '72',
    change: '-5%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'black'
  },
  {
    title: 'Compliance Rate',
    value: '94%',
    change: '+3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'yellow'
  },
  {
    title: 'Processing Time',
    value: '2.4h',
    change: '-12%',
    trend: 'down',
    icon: Clock,
    color: 'yellow'
  },
  {
    title: 'Prediction Accuracy',
    value: '89%',
    change: '+7%',
    trend: 'up',
    icon: TrendingUp,
    color: 'black'
  }
];

export default function Analytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-black mb-2">Legal Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into legal operations, risk assessment, and compliance metrics.</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                kpi.color === 'black' ? 'bg-gray-100' :
                kpi.color === 'yellow' ? 'bg-yellow-100' : 'bg-gray-100'
              }`}>
                <kpi.icon className={`w-6 h-6 ${
                  kpi.color === 'black' ? 'text-black' :
                  kpi.color === 'yellow' ? 'text-yellow-600' : 'text-gray-600'
                }`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpi.trend === 'up' ? 'text-yellow-600' : 'text-black'
              }`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                {kpi.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">{kpi.value}</h3>
            <p className="text-gray-600 text-sm">{kpi.title}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Risk Score Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-bold text-black mb-4">Risk Scores & Compliance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="riskScore" fill="#000000" name="Risk Score" />
              <Bar dataKey="compliance" fill="#EAB308" name="Compliance %" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Clause Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-bold text-black mb-4">Contract Clause Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clauseBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {clauseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Prediction Accuracy Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >
        <h2 className="text-xl font-bold text-black mb-4">Legal Outcome Predictions vs Actuals</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={outcomeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="predictions" 
              stroke="#EAB308" 
              strokeWidth={3}
              name="AI Predictions %" 
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#000000" 
              strokeWidth={3}
              name="Actual Outcomes %" 
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Compliance Heatmap Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-black mb-4">High Risk Contracts</h3>
          <div className="space-y-3">
            {['Tesla Service Agreement', 'Microsoft License', 'AWS Terms'].map((contract, index) => (
              <div key={contract} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium text-black">{contract}</span>
                <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                  Risk: {85 - index * 10}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-black mb-4">Compliance Alerts</h3>
          <div className="space-y-3">
            {['GDPR Review Required', 'Contract Expiring Soon', 'Missing Signatures'].map((alert, index) => (
              <div key={alert} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-black" />
                <span className="text-sm text-black">{alert}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-black mb-4">Recent Approvals</h3>
          <div className="space-y-3">
            {['NDA Template', 'Employment Contract', 'Partnership Agreement'].map((approval, index) => (
              <div key={approval} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-black">{approval}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}