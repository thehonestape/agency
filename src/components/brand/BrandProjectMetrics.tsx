import React from "react";
import { BrandCard, CardContent, CardHeader, CardTitle, CardFooter } from "./BrandCard";
import { BrandHeading } from "./BrandHeading";
import { BrandText } from "./BrandText";
import { BrandGrid } from "./BrandGrid";
import { BrandChart, ChartDataPoint } from "./BrandChart";
import { Project } from "../../data/testData";
import { FiTrendingUp, FiTrendingDown, FiEye, FiPercent, FiDollarSign, FiActivity } from "react-icons/fi";

interface BrandProjectMetricsProps {
  project: Project;
  className?: string;
}

// Format currency
const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined) return "N/A";
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

export function BrandProjectMetrics({ project, className = "" }: BrandProjectMetricsProps) {
  if (!project) {
    return <div>No project data available</div>;
  }
  
  // Create metric cards
  const metricCards = [
    {
      title: "Views",
      value: project.viewCount?.toLocaleString() || "N/A",
      icon: <FiEye className="h-5 w-5" />,
      description: "Total page views"
    },
    {
      title: "Engagement",
      value: project.engagement ? `${project.engagement}%` : "N/A",
      icon: <FiActivity className="h-5 w-5" />,
      description: "User interaction rate"
    },
    {
      title: "Conversion",
      value: project.conversionRate ? `${project.conversionRate}%` : "N/A",
      icon: <FiPercent className="h-5 w-5" />,
      description: "Lead conversion rate"
    },
    {
      title: "ROI",
      value: project.roi ? `${project.roi}%` : "N/A",
      icon: <FiTrendingUp className="h-5 w-5" />,
      description: "Return on investment"
    }
  ];
  
  // Budget metrics
  const hasBudgetData = project.budget !== undefined && project.spent !== undefined;
  const budgetUsage = hasBudgetData ? (project.spent! / project.budget! * 100) : 0;
  const isOverBudget = hasBudgetData && project.spent! > project.budget!;
  
  // Timeline data (if we decide to add this in the future)
  const timelineData: ChartDataPoint[] = [
    { label: "Planning", value: 100 },
    { label: "Design", value: project.progress >= 25 ? 100 : 0 },
    { label: "Development", value: project.progress >= 50 ? 100 : 0 },
    { label: "Testing", value: project.progress >= 75 ? 100 : 0 },
    { label: "Deployment", value: project.progress >= 100 ? 100 : 0 }
  ];
  
  // Budget data
  const budgetData: ChartDataPoint[] = hasBudgetData ? [
    { label: "Budget", value: project.budget! },
    { label: "Spent", value: project.spent! }
  ] : [];
  
  const MetricCard = ({ title, value, icon, description }: { title: string, value: string, icon: React.ReactNode, description: string }) => (
    <BrandCard elevation="low" className="flex flex-col h-full">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <BrandText weight="medium" size="sm">{title}</BrandText>
          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            {icon}
          </div>
        </div>
        <BrandHeading level={3} className="mb-1">{value}</BrandHeading>
        <BrandText size="xs" color="muted">{description}</BrandText>
      </CardContent>
    </BrandCard>
  );

  return (
    <div className={`brand-project-metrics ${className}`}>
      <BrandHeading level={2} className="mb-6">Project Performance</BrandHeading>
      
      {/* Metric Cards */}
      <BrandGrid columns={4} gap="md" responsive className="mb-8">
        {metricCards.map((card, index) => (
          <MetricCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            description={card.description}
          />
        ))}
      </BrandGrid>
      
      {/* Budget Section */}
      <BrandGrid columns={2} gap="md" responsive>
        {/* Budget Chart */}
        <BrandCard>
          <CardHeader>
            <CardTitle>
              <BrandHeading level={4}>Budget Allocation</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasBudgetData ? (
              <BrandChart
                type="bar"
                data={budgetData}
                height={200}
                showValues
              />
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-400">
                <BrandText>No budget data available</BrandText>
              </div>
            )}
          </CardContent>
          {hasBudgetData && (
            <CardFooter>
              <div className="flex flex-col w-full">
                <div className="flex justify-between mb-2">
                  <BrandText size="sm">Budget: {formatCurrency(project.budget)}</BrandText>
                  <BrandText size="sm">Spent: {formatCurrency(project.spent)}</BrandText>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${isOverBudget ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <BrandText size="xs" color="muted">
                    {hasBudgetData && (
                      isOverBudget 
                        ? `${Math.abs(budgetUsage - 100).toFixed(1)}% over budget` 
                        : `${(100 - budgetUsage).toFixed(1)}% remaining`
                    )}
                  </BrandText>
                  <BrandText size="xs" color="muted">
                    {project.lastUpdated ? `Last updated: ${project.lastUpdated}` : ''}
                  </BrandText>
                </div>
              </div>
            </CardFooter>
          )}
        </BrandCard>
        
        {/* Progress Timeline */}
        <BrandCard>
          <CardHeader>
            <CardTitle>
              <BrandHeading level={4}>Project Timeline</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BrandChart
              type="progress"
              data={timelineData}
              height={200}
              maxValue={100}
              showValues
              showLabels
            />
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <BrandText size="sm">Start: {project.startDate}</BrandText>
              <BrandText size="sm">End: {project.endDate}</BrandText>
            </div>
          </CardFooter>
        </BrandCard>
      </BrandGrid>
      
      {/* Additional Analytics */}
      <BrandCard className="mt-8">
        <CardHeader>
          <CardTitle>
            <BrandHeading level={4}>Project Analytics Summary</BrandHeading>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4">
            <BrandGrid columns={2} gap="md">
              <div>
                <BrandText weight="medium" className="mb-2">Performance Insights</BrandText>
                <ul className="space-y-2">
                  {project.roi && (
                    <li className="flex items-center">
                      <span className={`mr-2 ${project.roi > 100 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {project.roi > 100 ? <FiTrendingUp /> : <FiTrendingDown />}
                      </span>
                      <BrandText size="sm">
                        {project.roi > 100 
                          ? `Strong ROI performance at ${project.roi}%` 
                          : `ROI currently at ${project.roi}%`}
                      </BrandText>
                    </li>
                  )}
                  
                  {project.engagement && (
                    <li className="flex items-center">
                      <span className={`mr-2 ${project.engagement > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {project.engagement > 70 ? <FiTrendingUp /> : <FiTrendingDown />}
                      </span>
                      <BrandText size="sm">
                        {project.engagement > 70 
                          ? `High engagement rate at ${project.engagement}%` 
                          : `Moderate engagement at ${project.engagement}%`}
                      </BrandText>
                    </li>
                  )}
                  
                  {project.conversionRate !== undefined && (
                    <li className="flex items-center">
                      <span className={`mr-2 ${project.conversionRate > 5 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {project.conversionRate > 5 ? <FiTrendingUp /> : <FiTrendingDown />}
                      </span>
                      <BrandText size="sm">
                        {project.conversionRate > 5 
                          ? `Above-average conversion at ${project.conversionRate}%` 
                          : `Conversion rate at ${project.conversionRate}%`}
                      </BrandText>
                    </li>
                  )}
                </ul>
              </div>
              
              <div>
                <BrandText weight="medium" className="mb-2">Recommendations</BrandText>
                <ul className="space-y-2">
                  {project.engagement && project.engagement < 70 && (
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-500">•</span>
                      <BrandText size="sm">Consider increasing interactive elements to boost engagement</BrandText>
                    </li>
                  )}
                  
                  {project.conversionRate !== undefined && project.conversionRate < 5 && (
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-500">•</span>
                      <BrandText size="sm">Review call-to-action placement and messaging to improve conversion</BrandText>
                    </li>
                  )}
                  
                  {hasBudgetData && isOverBudget && (
                    <li className="flex items-center">
                      <span className="mr-2 text-rose-500">•</span>
                      <BrandText size="sm">Project is over budget - review remaining deliverables</BrandText>
                    </li>
                  )}
                  
                  {hasBudgetData && !isOverBudget && (project.spent! / project.budget!) > 0.8 && (
                    <li className="flex items-center">
                      <span className="mr-2 text-amber-500">•</span>
                      <BrandText size="sm">Budget usage is high - monitor remaining expenses</BrandText>
                    </li>
                  )}
                  
                  {project.roi && project.roi < 100 && (
                    <li className="flex items-center">
                      <span className="mr-2 text-blue-500">•</span>
                      <BrandText size="sm">Analyze cost centers to improve ROI</BrandText>
                    </li>
                  )}
                </ul>
              </div>
            </BrandGrid>
          </div>
        </CardContent>
      </BrandCard>
    </div>
  );
} 