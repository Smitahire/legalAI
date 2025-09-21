import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, FileText, Search, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  documentRef?: string;
  suggestions?: string[];
}

const sampleQuestions = [
  "What are the key terms in the Tesla agreement?",
  "Identify any liability risks in the contract",
  "What are the termination clauses?",
  "Summarize the payment terms",
];

const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: 'Hello! I\'m your AI legal assistant. I can help you analyze documents, find specific clauses, assess risks, and answer questions about your legal documents. What would you like to know?',
    timestamp: new Date(Date.now() - 300000),
    suggestions: sampleQuestions,
  }
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(content),
        timestamp: new Date(),
        documentRef: 'Tesla Inc. Service Agreement - Section 4.2',
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const generateResponse = (input: string): string => {
    const responses = [
      "Based on my analysis of the Tesla Service Agreement, Section 4.2 contains liability limitations that cap damages at $50,000. This clause significantly reduces Tesla's exposure to consequential damages.",
      "I've identified three key termination clauses in the document: (1) Termination for convenience with 30-day notice, (2) Immediate termination for material breach, and (3) Termination upon insolvency events.",
      "The payment terms specify Net 30 payment terms with a 2% early payment discount if paid within 10 days. Late payments incur a 1.5% monthly service charge.",
      "I found potential risk areas in the indemnification clause (Section 7.3) which places broad liability on your organization for third-party claims. Consider negotiating more balanced language.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-black mb-2">AI Legal Assistant</h1>
        <p className="text-gray-600">Ask questions about your documents and get intelligent answers with source references.</p>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-3xl ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-xl p-4 ${
                      message.type === 'user'
                        ? 'bg-black text-white ml-12'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {message.documentRef && (
                      <div className="mt-3 p-3 bg-white bg-opacity-10 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4" />
                          <span className="font-medium">Reference:</span>
                          <span>{message.documentRef}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-600 font-medium">Suggested questions:</p>
                      {message.suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-black text-sm transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <span>{suggestion}</span>
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Form */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about contracts, clauses, risks, or legal terms..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              disabled={isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
            >
              <Send className="w-4 h-4" />
              Send
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}