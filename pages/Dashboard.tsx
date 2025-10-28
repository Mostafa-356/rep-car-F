
import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { ICONS } from '../constants';

const features = [
    {
        title: 'AI Diagnostics',
        description: 'Describe your car\'s issue, upload a photo, and get instant diagnostic help.',
        link: '/diagnostics',
        icon: ICONS.diagnostics,
    },
    {
        title: 'Maintenance Schedules',
        description: 'Generate a personalized maintenance schedule for your vehicle.',
        link: '/schedule',
        icon: ICONS.schedule,
    },
    {
        title: 'DIY Repair Guides',
        description: 'Find step-by-step guides for common repairs and maintenance tasks.',
        link: '/guides',
        icon: ICONS.guides,
    },
    {
        title: 'Find Parts',
        description: 'Search for up-to-date car parts information and purchasing options online.',
        link: '/parts',
        icon: ICONS.parts,
    },
    {
        title: 'Find Local Shops',
        description: 'Locate nearby repair shops, dealerships, and part stores using your location.',
        link: '/shops',
        icon: ICONS.shops,
    }
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your AI Car Assistant</h1>
      <p className="text-gray-600 mb-8">
        Get intelligent, data-driven insights to keep your car running smoothly. Select a feature below to get started.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
            <Link to={feature.link} key={feature.title} className="transform transition-transform duration-300 hover:-translate-y-1">
                <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                         <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
                         <div className="text-muted-foreground">{feature.icon}</div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;