import React from 'react';
import { Download, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { AnalysisResult } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ResultsDashboardProps {
  result: AnalysisResult;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result }) => {
  const credibilityColor = result.credibilityScore >= 0.7 
    ? 'text-green-600' 
    : result.credibilityScore >= 0.4 
    ? 'text-yellow-600' 
    : 'text-red-600';

  const chartData = {
    labels: ['Authenticity', 'Sentiment', 'Language', 'Time Pattern', 'Overall'],
    datasets: [
      {
        label: 'Analysis Metrics',
        data: [
          result.authenticityScore,
          result.sentimentScore,
          result.languageScore,
          result.timePatternScore,
          result.credibilityScore
        ],
        fill: false,
        borderColor: 'rgb(79, 70, 229)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Review Analysis Metrics'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Results</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Credibility Score</span>
                </div>
                <span className={`text-lg font-bold ${credibilityColor}`}>
                  {(result.credibilityScore * 100).toFixed(1)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Authenticity</span>
                  </div>
                  <span className="text-lg font-bold">
                    {(result.authenticityScore * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Sentiment</span>
                  </div>
                  <span className="text-lg font-bold">
                    {(result.sentimentScore * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
        <div className="space-y-4">
          {result.warnings.map((warning, index) => (
            <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">{warning}</p>
            </div>
          ))}
          
          <div className="mt-6">
            <button
              onClick={() => {
                const jsonString = JSON.stringify(result, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'analysis-report.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;