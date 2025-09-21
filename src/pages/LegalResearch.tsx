import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Scale, ExternalLink, Star } from 'lucide-react';

const searchResults = [
  {
    id: 1,
    title: 'Smith v. Johnson Corp.',
    court: 'Supreme Court of California',
    year: '2023',
    relevance: 95,
    summary: 'Landmark case establishing precedent for AI liability in autonomous vehicle accidents. Court ruled that manufacturers bear primary responsibility for AI decision-making failures.',
    tags: ['AI Liability', 'Product Liability', 'Autonomous Vehicles'],
    citations: 47
  },
  {
    id: 2,
    title: 'Tech Innovations Ltd. v. Data Corp.',
    court: 'Federal Circuit Court',
    year: '2022',
    relevance: 89,
    summary: 'Important ruling on intellectual property rights for AI-generated content and machine learning algorithms in commercial applications.',
    tags: ['Intellectual Property', 'AI', 'Machine Learning'],
    citations: 32
  },
  {
    id: 3,
    title: 'Privacy Alliance v. MetaCorp',
    court: 'District Court of New York',
    year: '2023',
    relevance: 84,
    summary: 'Significant decision on data privacy obligations and user consent requirements for AI systems processing personal information.',
    tags: ['Data Privacy', 'GDPR', 'User Consent'],
    citations: 28
  },
  {
    id: 4,
    title: 'Workers Union v. AutoManufacturing Inc.',
    court: 'Court of Appeals, 9th Circuit',
    year: '2022',
    relevance: 78,
    summary: 'Employment law case addressing worker displacement due to AI automation and corporate obligations for retraining and compensation.',
    tags: ['Employment Law', 'AI Automation', 'Worker Rights'],
    citations: 21
  }
];

const researchTopics = [
  { name: 'AI Liability', count: 1240 },
  { name: 'Data Privacy', count: 2810 },
  { name: 'Intellectual Property', count: 1890 },
  { name: 'Contract Law', count: 3450 },
  { name: 'Employment Law', count: 2100 },
  { name: 'Regulatory Compliance', count: 1650 },
];

export default function LegalResearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchQuery);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'text-black bg-yellow-100';
    if (relevance >= 80) return 'text-yellow-700 bg-yellow-50';
    if (relevance >= 70) return 'text-black bg-gray-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-black mb-2">Legal Research</h1>
        <p className="text-gray-600">Comprehensive case law research and precedent analysis powered by AI.</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case law, statutes, regulations, or legal concepts..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-lg"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 font-semibold"
          >
            <Search className="w-5 h-5" />
            Search
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </motion.button>
        </form>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-yellow-50 rounded-lg"
          >
            <h3 className="font-medium text-black mb-3">Filter by Topics</h3>
            <div className="flex flex-wrap gap-2">
              {researchTopics.map(topic => (
                <button
                  key={topic.name}
                  onClick={() => toggleFilter(topic.name)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedFilters.includes(topic.name)
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {topic.name} ({topic.count})
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Results */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-xl font-bold text-black mb-4">Search Results</h2>
            <p className="text-gray-600">Found {searchResults.length} relevant cases and legal documents</p>
          </motion.div>

          <div className="space-y-6">
            {searchResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2 hover:text-yellow-600 cursor-pointer">
                      {result.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Scale className="w-4 h-4" />
                        {result.court}
                      </span>
                      <span>{result.year}</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {result.citations} citations
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(result.relevance)}`}>
                      {result.relevance}% relevant
                    </span>
                    <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                      <Star className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{result.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-yellow-100 text-black text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-black hover:text-yellow-600 font-medium text-sm"
                  >
                    View Full Case
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-bold text-black mb-4">Popular Research Topics</h3>
            <div className="space-y-3">
              {researchTopics.map(topic => (
                <div key={topic.name} className="flex items-center justify-between">
                  <button className="text-black hover:text-yellow-600 font-medium text-sm">
                    {topic.name}
                  </button>
                  <span className="text-xs text-gray-500">{topic.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition-colors text-sm">
                📋 Save Search Query
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition-colors text-sm">
                📊 Export Results
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition-colors text-sm">
                🔔 Set Alert for New Cases
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition-colors text-sm">
                📚 View Research History
              </button>
            </div>
          </motion.div>

          {/* Research Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-xl border border-yellow-300"
          >
            <h3 className="text-lg font-bold text-black mb-3">Research Tips</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>• Use quotation marks for exact phrases</li>
              <li>• Try different keyword combinations</li>
              <li>• Filter by jurisdiction for targeted results</li>
              <li>• Check citation networks for related cases</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}