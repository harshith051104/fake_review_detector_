import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Review } from '../types';

interface ReviewFormProps {
  onSubmit: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText && !reviewUrl) {
      setError('Please enter a review text or URL');
      return;
    }
    
    const review: Review = {
      text: reviewText,
      source: reviewUrl || 'direct-input',
      timestamp: new Date().toISOString(),
    };
    
    onSubmit(review);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
          Review Text
        </label>
        <div className="mt-1">
          <textarea
            id="reviewText"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Paste the review text here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reviewUrl" className="block text-sm font-medium text-gray-700">
          Review URL
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="reviewUrl"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="https://example.com/review"
            value={reviewUrl}
            onChange={(e) => setReviewUrl(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Analyze Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;