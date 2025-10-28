
import React, { useState, useCallback } from 'react';
import { getDiagnostics } from '../services/geminiService';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import { useNotifications } from '../context/NotificationContext';
import { DiagnosticResult, NotificationType } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';
import { ICONS } from '../constants';

const Diagnostics: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) {
      addNotification('Please describe the problem.', NotificationType.Error);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await getDiagnostics(problem, image || undefined);
      const jsonText = response.text.trim();
      const parsedResult: DiagnosticResult = JSON.parse(jsonText);
      setResult(parsedResult);
    } catch (error) {
      console.error('Diagnostics error:', error);
      addNotification('Failed to get diagnostics. Please try again.', NotificationType.Error);
    } finally {
      setIsLoading(false);
    }
  }, [problem, image, addNotification]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Diagnostics</h1>
      <p className="text-gray-600 mb-8">
        Describe the issue you're experiencing with your vehicle. For better results, upload a photo of the affected area.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Problem Description</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
                  What's happening?
                </label>
                <Textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="e.g., I hear a rattling noise from the engine when I accelerate."
                  rows={5}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        {ICONS.upload}
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                                <span>Upload a file</span>
                                <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" disabled={isLoading} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                {imagePreview && (
                    <div className="mt-4">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md"/>
                    </div>
                )}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <LoadingSpinner /> : 'Diagnose Problem'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diagnostic Report</CardTitle>
            <CardDescription>Results from our AI analysis will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <SkeletonLoader className="h-8 w-1/3" />
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-5/6" />
                <SkeletonLoader className="h-8 w-1/2 mt-4" />
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-3/4" />
              </div>
            )}
            {result && !isLoading && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">Severity Level: 
                    <span className={`ml-2 px-2 py-1 rounded-full text-sm ${result.severity_level === 'High' ? 'bg-red-100 text-red-800' : result.severity_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {result.severity_level}
                    </span>
                  </h4>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Possible Causes</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {result.possible_causes.map((cause, i) => <li key={i}>{cause}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Recommended Actions</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {result.recommended_actions.map((action, i) => <li key={i}>{action}</li>)}
                  </ul>
                </div>
              </div>
            )}
            {!result && !isLoading && (
                <div className="text-center text-gray-500 py-10">
                    <p>Your report is waiting.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diagnostics;
