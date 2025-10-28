
import React, { useState, useCallback } from 'react';
import { findCarParts } from '../services/geminiService';
import Card, { CardContent, CardHeader, CardTitle } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNotifications } from '../context/NotificationContext';
import { NotificationType } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import { marked } from 'marked';

const FindParts: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      addNotification('Please enter a part to search for.', NotificationType.Error);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await findCarParts(query);
      const markdownText = await marked.parse(response.text);
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setResult({ text: markdownText, sources: groundingChunks });
    } catch (error) {
      console.error('Find parts error:', error);
      addNotification('Failed to find parts. Please try again.', NotificationType.Error);
    } finally {
      setIsLoading(false);
    }
  }, [query, addNotification]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Car Parts</h1>
      <p className="text-gray-600 mb-8">
        Describe the part you need. Our AI will search the web for the latest information and purchasing options.
      </p>
      <Card className="mb-8">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              placeholder="e.g., Brake pads for a 2021 Ford F-150"
              value={query}
              onChange={e => setQuery(e.target.value)}
              disabled={isLoading}
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
            <CardContent className="space-y-4">
                <SkeletonLoader className="h-8 w-1/3" />
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-5/6" />
            </CardContent>
        </Card>
      )}

      {result && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results for: {query}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: result.text }}
            />
            {result.sources.length > 0 && (
                <div>
                    <h4 className="font-semibold text-lg text-gray-800 mb-2 border-t pt-4">Sources</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {result.sources.map((chunk, index) => (
                            chunk.web && (
                                <li key={index}>
                                    <a
                                        href={chunk.web.uri}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {chunk.web.title}
                                    </a>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FindParts;
