import React from 'react';
import { useParams } from 'react-router-dom';
import { Brain, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';

const BrandMemoryPage = () => {
  const { brandId } = useParams();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Brand Memory</h1>
          <p className="text-muted-foreground">AI-powered insights and pattern recognition</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Key Insights
            </CardTitle>
            <CardDescription>Recent patterns and observations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-medium">Growing Social Engagement</p>
                  <p className="text-sm text-muted-foreground">
                    15% increase in Instagram engagement over the last month
                  </p>
                </div>
              </li>
              {/* Add more insights */}
            </ul>
          </CardContent>
        </Card>

        {/* Historical Context */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Historical Context
            </CardTitle>
            <CardDescription>Brand evolution and key moments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-muted pl-4 space-y-2">
                <p className="text-sm text-muted-foreground">June 2023</p>
                <p className="font-medium">Brand Refresh</p>
                <p className="text-sm text-muted-foreground">
                  Complete visual identity update with new color palette
                </p>
              </div>
              {/* Add more historical events */}
            </div>
          </CardContent>
        </Card>

        {/* Learning & Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Recommendations
            </CardTitle>
            <CardDescription>AI-generated suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="font-medium">Content Strategy</p>
                  <p className="text-sm text-muted-foreground">
                    Consider increasing video content based on recent engagement patterns
                  </p>
                </div>
              </li>
              {/* Add more recommendations */}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes across all channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add timeline items */}
            <div className="flex gap-4">
              <div className="w-12 text-sm text-muted-foreground">1h ago</div>
              <div>
                <p className="font-medium">Website Update</p>
                <p className="text-sm text-muted-foreground">New hero section deployed</p>
              </div>
            </div>
            {/* Add more timeline items */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { BrandMemoryPage }; 