import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Shield, Upload, Link, FileText, PieChart, History, Download } from 'lucide-react';
import ReviewForm from './components/ReviewForm';
import ResultsDashboard from './components/ResultsDashboard';
import HistoryPanel from './components/HistoryPanel';
import { Review, AnalysisResult } from './types';
import { analyzeReview } from './utils/analyzer';

function App() {
  const [activeTab, setActiveTab] = useState<'input' | 'results' | 'history'>('input');
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const result = await analyzeReview(text);
      setAnalysisResult(result);
      setAnalysisHistory(prev => [...prev, result]);
      setActiveTab('results');
    };
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleReviewSubmit = async (review: Review) => {
    setCurrentReview(review);
    const result = await analyzeReview(review.text);
    setAnalysisResult(result);
    setAnalysisHistory(prev => [...prev, result]);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ReviewGuard AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('input')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'input'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Analyze
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'results'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'history'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                History
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'input' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Analysis</h2>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>

            <div className="bg-white rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Reviews</h3>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag & drop your review files here, or click to select files
                </p>
                <p className="text-xs text-gray-500">Supports CSV, TXT files</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && analysisResult && (
          <ResultsDashboard result={analysisResult} />
        )}

        {activeTab === 'history' && (
          <HistoryPanel history={analysisHistory} onSelectResult={(result) => {
            setAnalysisResult(result);
            setActiveTab('results');
          }} />
        )}
      </main>
    </div>
  );
}

export default App;