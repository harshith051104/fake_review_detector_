export interface Review {
  text: string;
  source: string;
  timestamp: string;
}

export interface AnalysisResult {
  credibilityScore: number;
  authenticityScore: number;
  sentimentScore: number;
  languageScore: number;
  timePatternScore: number;
  warnings: string[];
  timestamp: string;
  reviewText: string;
  source: string;
}