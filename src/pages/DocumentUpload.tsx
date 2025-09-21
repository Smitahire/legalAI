import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  File, 
  CheckCircle, 
  Clock, 
  Eye,
  MessageSquare,
  BarChart3,
  FileText,
  X
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed';
  currentStage: number;
}

const processingStages = [
  { id: 1, name: 'AI Pre-Processor', description: 'OCR, text extraction, segmentation', icon: FileText },
  { id: 2, name: 'Summary & Risk', description: 'Plain-language summary, obligations, risks', icon: BarChart3 },
  { id: 3, name: 'Q&A Chatbot', description: 'Semantic search, contextual answers', icon: MessageSquare },
  { id: 4, name: 'Final Display', description: 'Summaries, visualizations, chat', icon: Eye },
];

export default function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  }, []);

  const processFiles = (newFiles: File[]) => {
    const uploadedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const,
      currentStage: 0,
    }));

    setFiles(prev => [...prev, ...uploadedFiles]);

    // Simulate upload and processing
    uploadedFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    let stage = 1;

    const updateProgress = () => {
      progress += Math.random() * 15;
      
      setFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (progress >= 100) {
            return { ...file, progress: 100, status: 'completed', currentStage: 4 };
          } else if (progress > 75) {
            return { ...file, progress, currentStage: 4, status: 'processing' };
          } else if (progress > 50) {
            return { ...file, progress, currentStage: 3, status: 'processing' };
          } else if (progress > 25) {
            return { ...file, progress, currentStage: 2, status: 'processing' };
          } else {
            return { ...file, progress, currentStage: 1, status: 'processing' };
          }
        }
        return file;
      }));

      if (progress < 100) {
        setTimeout(updateProgress, 800 + Math.random() * 400);
      }
    };

    updateProgress();
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-black mb-2">Document Upload & Processing</h1>
        <p className="text-gray-600">Upload your legal documents for AI-powered analysis and insights.</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging 
              ? 'border-yellow-500 bg-yellow-50' 
              : 'border-gray-300 hover:border-yellow-400 hover:bg-yellow-50'
          }`}
        >
          <motion.div
            animate={{ scale: isDragging ? 1.05 : 1 }}
            className="flex flex-col items-center"
          >
            <Upload className={`w-12 h-12 mb-4 ${isDragging ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h3 className="text-xl font-semibold text-black mb-2">
              {isDragging ? 'Drop files here' : 'Upload Documents'}
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your files here, or click to browse
            </p>
            <div className="flex gap-4 text-sm text-gray-500 mb-4">
              <span>PDF</span>
              <span>•</span>
              <span>DOCX</span>
              <span>•</span>
              <span>Images</span>
            </div>
            <label className="bg-yellow-500 text-black px-6 py-2 rounded-lg cursor-pointer hover:bg-yellow-400 transition-colors font-semibold">
              Choose Files
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </motion.div>
        </div>
      </motion.div>

      {/* Processing Pipeline */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-black mb-6">Processing Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {processingStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
                  index % 2 === 0 ? 'border-yellow-500' : 'border-black'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stage.icon className={`w-5 h-5 ${
                    index % 2 === 0 ? 'text-yellow-600' : 'text-black'
                  }`} />
                  <h3 className="font-semibold text-black">{stage.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{stage.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-black mb-4">Uploaded Files</h2>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-start gap-4">
                  <File className="w-8 h-8 text-yellow-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-black">{file.name}</h3>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-yellow-600" />
                        )}
                        {file.status === 'processing' && (
                          <Clock className="w-5 h-5 text-black" />
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{file.status === 'completed' ? 'Complete' : 'Processing...'}</span>
                        <span>{Math.round(file.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${file.progress}%` }}
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Stage Indicators */}
                    <div className="flex gap-2">
                      {processingStages.map((stage) => (
                        <div
                          key={stage.id}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                            file.currentStage >= stage.id
                              ? 'bg-yellow-100 text-black font-semibold'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {file.currentStage >= stage.id && (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          {stage.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}