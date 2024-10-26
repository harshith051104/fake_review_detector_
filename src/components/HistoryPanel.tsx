import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { AnalysisResult } from '../types';

interface HistoryPanelProps {
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelectResult }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis History</h2>
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No analysis history yet</p>
        ) : (
          history.map((result, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => onSelectResult(result)}
            >
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    Analysis #{history.length - index}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Credibility Score
                  </p>
                  <p className={`text-sm ${
                    result.credibilityScore >= 0.7 
                      ? 'text-green-600' 
                      : result.credibilityScore >= 0.4 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}>
                    {(result.credibilityScore * 100).toFixed(1)}%
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;