
import React, { useState, useCallback, useEffect } from 'react';
import { findShops } from '../services/geminiService';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNotifications } from '../context/NotificationContext';
import { NotificationType } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import { marked } from 'marked';

const FindShops: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const { addNotification } = useNotifications();

   useEffect(() => {
        setIsLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setLocationError(null);
                    setIsLoading(false);
                },
                (error) => {
                    const message = `Error getting location: ${error.message}`;
                    setLocationError(message);
                    addNotification(message, NotificationType.Error);
                    setIsLoading(false);
                }
            );
        } else {
            const message = "Geolocation is not supported by this browser.";
            setLocationError(message);
            addNotification(message, NotificationType.Error);
            setIsLoading(false);
        }
    }, [addNotification]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      addNotification('Please enter what you are looking for.', NotificationType.Error);
      return;
    }
    if (!location) {
        addNotification('Location is not available. Please enable location services.', NotificationType.Error);
        return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await findShops(query, location);
      const markdownText = await marked.parse(response.text);
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setResult({ text: markdownText, sources: groundingChunks });
    } catch (error) {
      console.error('Find shops error:', error);
      addNotification('Failed to find shops. Please try again.', NotificationType.Error);
    } finally {
      setIsLoading(false);
    }
  }, [query, location, addNotification]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Local Shops</h1>
      <p className="text-gray-600 mb-8">
        Search for nearby shops. This feature requires location access to work correctly.
      </p>
      <Card className="mb-8">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              placeholder="e.g., Tire shop, BMW mechanic"
              value={query}
              onChange={e => setQuery(e.target.value)}
              disabled={isLoading || !location}
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading || !location}>
              {isLoading ? <LoadingSpinner /> : 'Search Nearby'}
            </Button>
          </form>
           {locationError && <p className="text-red-500 text-sm mt-2">{locationError}</p>}
           {!location && !locationError && <p className="text-yellow-600 text-sm mt-2">Getting your location...</p>}
        </CardContent>
      </Card>

      {isLoading && !result && (
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
                    <h4 className="font-semibold text-lg text-gray-800 mb-2 border-t pt-4">Places on Google Maps</h4>
                    <ul className="list-disc list-inside space-y-2">
                        {result.sources.map((chunk, index) => (
                             chunk.maps && (
                                <li key={index}>
                                    <a
                                        href={chunk.maps.uri}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {chunk.maps.title}
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

export default FindShops;
