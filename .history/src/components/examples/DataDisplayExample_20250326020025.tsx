import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

// Try to import chart components
let BrandChart: React.ComponentType<any> | undefined;
let ChartDataPoint: any;

try {
  const chartComponents = require('@/components/brand/BrandChart');
  BrandChart = chartComponents.BrandChart;
  ChartDataPoint = chartComponents.ChartDataPoint;
} catch (e) {
  console.warn('Chart components could not be loaded:', (e as Error).message);
  
  // Try alternative import path
  try {
    const chartComponents = require('@/components/features/brand/BrandChart');
    BrandChart = chartComponents.BrandChart;
    ChartDataPoint = chartComponents.ChartDataPoint;
  } catch (e) {
    console.warn('Chart components could not be loaded from alternative path:', (e as Error).message);
  }
}

// Sample data for the charts
const barChartData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 59 },
  { label: 'Mar', value: 80 },
  { label: 'Apr', value: 81 },
  { label: 'May', value: 56 },
  { label: 'Jun', value: 55 },
];

const pieChartData = [
  { label: 'Desktop', value: 63 },
  { label: 'Mobile', value: 25 },
  { label: 'Tablet', value: 12 },
];

const lineChartData = [
  { label: 'Week 1', value: 40 },
  { label: 'Week 2', value: 45 },
  { label: 'Week 3', value: 42 },
  { label: 'Week 4', value: 49 },
  { label: 'Week 5', value: 55 },
  { label: 'Week 6', value: 58 },
  { label: 'Week 7', value: 61 },
];

// Fallback chart component using CSS
const FallbackBarChart = ({ data }: { data: { label: string; value: number }[] }) => (
  <div className="flex flex-col space-y-2">
    {data.map((item, i) => (
      <div key={i} className="flex flex-col">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{item.label}</span>
          <span className="text-sm text-gray-500">{item.value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${item.value}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

const FallbackPieChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {data.map((item, i) => {
              const percentage = item.value / total;
              const startAngle = i === 0 ? 0 : data.slice(0, i).reduce((sum, d) => sum + (d.value / total) * 360, 0);
              const endAngle = startAngle + percentage * 360;
              
              // Convert angles to radians
              const startRad = (startAngle - 90) * Math.PI / 180;
              const endRad = (endAngle - 90) * Math.PI / 180;
              
              // Calculate points
              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);
              
              // Create arc path
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
              const path = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
              
              return (
                <path
                  key={i}
                  d={path}
                  fill={colors[i % colors.length]}
                  stroke="#fff"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>
        
        <div className="mt-4 grid grid-cols-1 gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 mr-2" style={{ backgroundColor: colors[i % colors.length] }}></div>
              <span className="text-sm">{item.label}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FallbackLineChart = ({ data }: { data: { label: string; value: number }[] }) => (
  <div className="h-64 relative">
    <div className="absolute inset-0 flex items-end">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <div 
            className="bg-blue-500 w-6 rounded-t"
            style={{ height: `${(item.value / 100) * 200}px` }}
          ></div>
          <div className="text-xs mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export function DataDisplayExample() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>Displaying monthly data with a bar chart</CardDescription>
        </CardHeader>
        <CardContent>
          {BrandChart ? (
            <BrandChart
              data={barChartData}
              type="bar"
              height={250}
              width={500}
              showValues
              animated
            />
          ) : (
            <FallbackBarChart data={barChartData} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pie Chart</CardTitle>
          <CardDescription>Device breakdown by percentage</CardDescription>
        </CardHeader>
        <CardContent>
          {BrandChart ? (
            <BrandChart
              data={pieChartData}
              type="pie"
              height={300}
              width={500}
              showLegend
              animated
            />
          ) : (
            <FallbackPieChart data={pieChartData} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>Weekly trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          {BrandChart ? (
            <BrandChart
              data={lineChartData}
              type="line"
              height={250}
              width={500}
              showValues
              animated
            />
          ) : (
            <FallbackLineChart data={lineChartData} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DataDisplayExample; 