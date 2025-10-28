
import React, { useState, useCallback } from 'react';
import { generateMaintenanceSchedule } from '../services/geminiService';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNotifications } from '../context/NotificationContext';
import { MaintenanceScheduleResult, NotificationType } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonLoader from '../components/SkeletonLoader';

const MaintenanceSchedule: React.FC = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [schedule, setSchedule] = useState<MaintenanceScheduleResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !year || !mileage) {
      addNotification('Please fill out all fields.', NotificationType.Error);
      return;
    }

    setIsLoading(true);
    setSchedule(null);

    try {
      const response = await generateMaintenanceSchedule(make, model, parseInt(year), parseInt(mileage));
      const jsonText = response.text.trim();
      setSchedule(JSON.parse(jsonText));
    } catch (error) {
      console.error('Schedule generation error:', error);
      addNotification('Failed to generate schedule. Please try again.', NotificationType.Error);
    } finally {
      setIsLoading(false);
    }
  }, [make, model, year, mileage, addNotification]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Maintenance Schedule</h1>
      <p className="text-gray-600 mb-8">
        Enter your vehicle's details to generate a recommended maintenance schedule.
      </p>
      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input placeholder="Make (e.g., Toyota)" value={make} onChange={e => setMake(e.target.value)} disabled={isLoading} />
            <Input placeholder="Model (e.g., Camry)" value={model} onChange={e => setModel(e.target.value)} disabled={isLoading} />
            <Input type="number" placeholder="Year (e.g., 2020)" value={year} onChange={e => setYear(e.target.value)} disabled={isLoading} />
            <Input type="number" placeholder="Current Mileage" value={mileage} onChange={e => setMileage(e.target.value)} disabled={isLoading} />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <LoadingSpinner /> : 'Generate'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="space-y-2">
            <SkeletonLoader className="h-12 w-full" />
            <SkeletonLoader className="h-12 w-full" />
            <SkeletonLoader className="h-12 w-full" />
        </div>
      )}

      {schedule && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Your Custom Schedule</CardTitle>
            <CardDescription>Based on a {year} {make} {model} with {mileage} miles.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommended Interval (Miles)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {schedule.schedule.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.task_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.interval_miles.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceSchedule;
