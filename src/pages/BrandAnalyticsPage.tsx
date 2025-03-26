import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { BrandHeading } from "../components/brand/BrandHeading";
import { BrandText } from "../components/brand/BrandText";
import { BrandContainer } from "../components/brand/BrandContainer";
import { BrandGrid } from "../components/brand/BrandGrid";
import { BrandCard, CardContent, CardHeader, CardTitle, CardFooter } from "../components/brand/BrandCard";
import { BrandChart, ChartDataPoint } from "../components/brand/BrandChart";
import { BrandSwitcher } from "../components/brand/BrandSwitcher";
import { BrandAssetShowcase } from "../components/brand/BrandAssetShowcase";
import { useBrand } from "../components/brand/BrandProvider";
import { testBrands, testProjects } from "../data/testData";
import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiPieChart, FiUsers, FiEye, FiClock, FiCheck, FiImage, FiX, FiDollarSign, FiPercent } from "react-icons/fi";

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

// Generate some analytics data based on test data
const generateAnalyticsData = () => {
  // Project completion data
  const projectStatusData: ChartDataPoint[] = [
    { label: "Completed", value: testProjects.filter(p => p.status === "completed").length },
    { label: "In Progress", value: testProjects.filter(p => p.status === "in-progress").length },
    { label: "Not Started", value: testProjects.filter(p => p.status === "not-started").length },
  ];
  
  // Brand usage data - how many projects per brand
  const brandUsageData: ChartDataPoint[] = testBrands.map(brand => ({
    label: brand.name,
    value: testProjects.filter(p => p.client === brand.client).length
  }));
  
  // Task completion rate for each project
  const projectProgressData: ChartDataPoint[] = testProjects.map(project => {
    const completed = project.tasks?.filter(t => t.status === "completed").length || 0;
    const total = project.tasks?.length || 1;
    return {
      label: project.name,
      value: Math.round((completed / total) * 100)
    };
  });
  
  // Timeline data (months)
  const timelineData: ChartDataPoint[] = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  months.forEach((month, i) => {
    timelineData.push({
      label: month,
      value: Math.round(10 + Math.random() * 40) // Random values between 10-50
    });
  });
  
  // Team size data
  const teamSizeData: ChartDataPoint[] = testProjects.map(project => ({
    label: project.name,
    value: project.team?.length || 0
  }));
  
  // NEW METRICS
  
  // View count data
  const viewCountData: ChartDataPoint[] = testProjects
    .filter(p => p.viewCount !== undefined)
    .map(project => ({
      label: project.name,
      value: project.viewCount || 0
    }))
    .sort((a, b) => b.value - a.value) // Sort by highest view count
    .slice(0, 5); // Top 5 projects
  
  // Engagement rate data
  const engagementData: ChartDataPoint[] = testProjects
    .filter(p => p.engagement !== undefined)
    .map(project => ({
      label: project.name,
      value: project.engagement || 0
    }));
  
  // Conversion rate data
  const conversionRateData: ChartDataPoint[] = testProjects
    .filter(p => p.conversionRate !== undefined)
    .map(project => ({
      label: project.name,
      value: project.conversionRate || 0
    }));
  
  // ROI data
  const roiData: ChartDataPoint[] = testProjects
    .filter(p => p.roi !== undefined)
    .map(project => ({
      label: project.name,
      value: project.roi || 0
    }));
  
  // Budget vs spent data
  const budgetSpentData: ChartDataPoint[] = [];
  testProjects.forEach(project => {
    if (project.budget && project.spent) {
      budgetSpentData.push({ label: `${project.name} (Budget)`, value: project.budget });
      budgetSpentData.push({ label: `${project.name} (Spent)`, value: project.spent });
    }
  });
  
  // Total metrics
  const totalViews = testProjects.reduce((sum, project) => sum + (project.viewCount || 0), 0);
  const avgEngagement = testProjects.filter(p => p.engagement !== undefined).reduce((sum, project) => sum + (project.engagement || 0), 0) / 
    testProjects.filter(p => p.engagement !== undefined).length;
  const avgConversion = testProjects.filter(p => p.conversionRate !== undefined).reduce((sum, project) => sum + (project.conversionRate || 0), 0) / 
    testProjects.filter(p => p.conversionRate !== undefined).length;
  const totalBudget = testProjects.reduce((sum, project) => sum + (project.budget || 0), 0);
  const totalSpent = testProjects.reduce((sum, project) => sum + (project.spent || 0), 0);
  
  return {
    projectStatusData,
    brandUsageData,
    projectProgressData,
    timelineData,
    teamSizeData,
    viewCountData,
    engagementData,
    conversionRateData,
    roiData,
    budgetSpentData,
    totalViews,
    avgEngagement,
    avgConversion,
    totalBudget,
    totalSpent
  };
};

// Define some stat card data
const statCards = [
  {
    title: "Total Projects",
    value: testProjects.length,
    change: "+12%",
    trend: "up",
    icon: <FiBarChart2 className="h-5 w-5" />
  },
  {
    title: "Active Brands",
    value: testBrands.length,
    change: "+3%",
    trend: "up",
    icon: <FiPieChart className="h-5 w-5" />
  },
  {
    title: "Team Members",
    value: [...new Set(testProjects.flatMap(p => p.team?.map(t => t.id) || []))].length,
    change: "+5%",
    trend: "up",
    icon: <FiUsers className="h-5 w-5" />
  },
  {
    title: "Avg. Completion",
    value: Math.round(testProjects.reduce((acc, p) => acc + (p.progress || 0), 0) / testProjects.length) + "%",
    change: "-2%",
    trend: "down",
    icon: <FiCheck className="h-5 w-5" />
  }
];

export function BrandAnalyticsPage() {
  const { currentBrand } = useBrand();
  const [analyticsData, setAnalyticsData] = useState(generateAnalyticsData());
  const [loading, setLoading] = useState(true);
  const [showAssets, setShowAssets] = useState(false);
  
  // Simulate API loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAnalyticsData(generateAnalyticsData());
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [currentBrand]); // Refresh when brand changes
  
  // Get filtered data based on the current brand
  const getFilteredData = () => {
    if (!currentBrand) return analyticsData;
    
    // Filter project progress data to only show projects for the current brand
    const filterProjectsByBrand = (dataPoints: ChartDataPoint[]) => {
      return dataPoints.filter(item => {
        const project = testProjects.find(p => p.name === item.label || item.label.startsWith(p.name));
        return project && project.client === currentBrand.client;
      });
    };
    
    // Calculate brand-specific total metrics
    const brandProjects = testProjects.filter(p => p.client === currentBrand.client);
    const totalViews = brandProjects.reduce((sum, project) => sum + (project.viewCount || 0), 0);
    const avgEngagement = brandProjects.filter(p => p.engagement !== undefined).reduce((sum, project) => sum + (project.engagement || 0), 0) / 
      (brandProjects.filter(p => p.engagement !== undefined).length || 1);
    const avgConversion = brandProjects.filter(p => p.conversionRate !== undefined).reduce((sum, project) => sum + (project.conversionRate || 0), 0) / 
      (brandProjects.filter(p => p.conversionRate !== undefined).length || 1);
    const totalBudget = brandProjects.reduce((sum, project) => sum + (project.budget || 0), 0);
    const totalSpent = brandProjects.reduce((sum, project) => sum + (project.spent || 0), 0);
    
    return {
      ...analyticsData,
      projectProgressData: filterProjectsByBrand(analyticsData.projectProgressData),
      teamSizeData: filterProjectsByBrand(analyticsData.teamSizeData),
      viewCountData: filterProjectsByBrand(analyticsData.viewCountData),
      engagementData: filterProjectsByBrand(analyticsData.engagementData),
      conversionRateData: filterProjectsByBrand(analyticsData.conversionRateData),
      roiData: filterProjectsByBrand(analyticsData.roiData),
      budgetSpentData: filterProjectsByBrand(analyticsData.budgetSpentData),
      totalViews,
      avgEngagement,
      avgConversion,
      totalBudget,
      totalSpent
    };
  };
  
  const data = getFilteredData();
  
  // Stat card component
  const StatCard = ({ title, value, change, trend, icon }: any) => (
    <BrandCard elevation="low" className="flex flex-col">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <BrandText color="muted" size="sm">{title}</BrandText>
            <BrandHeading level={3} className="mt-2 mb-1">{value}</BrandHeading>
            <div className={`text-sm flex items-center ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend === 'up' ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
              {change} from last month
            </div>
          </div>
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
            {icon}
          </div>
        </div>
      </CardContent>
    </BrandCard>
  );
  
  if (loading) {
    return (
      <DashboardLayout>
        <BrandContainer maxWidth="xl" padding="md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <BrandGrid columns={4} gap="md" responsive>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </BrandGrid>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </BrandContainer>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <BrandContainer maxWidth="xl" padding="md">
        <div className="flex justify-between items-start mb-8">
          <div>
            <BrandHeading level={1}>Brand Analytics</BrandHeading>
            <BrandText size="lg" color="muted">
              Performance metrics and analytics for {currentBrand ? currentBrand.name : "all brands"}
            </BrandText>
          </div>
          <div className="mt-2">
            <BrandSwitcher variant="dropdown" label="Select Brand" />
          </div>
        </div>
        
        {/* Brand Assets Showcase (only when a specific brand is selected) */}
        {currentBrand && (
          <BrandCard className="mb-8 overflow-hidden">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <BrandHeading level={4}>{currentBrand.name} Brand Assets</BrandHeading>
              </CardTitle>
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowAssets(!showAssets)}
                aria-label={showAssets ? "Hide assets" : "Show assets"}
              >
                {showAssets ? <FiX className="w-5 h-5" /> : <FiImage className="w-5 h-5" />}
              </button>
            </CardHeader>
            {showAssets && (
              <CardContent>
                <BrandGrid columns={2} gap="md" responsive>
                  <div>
                    <BrandText weight="medium" className="mb-3">Brand Logos</BrandText>
                    <BrandAssetShowcase filter="logo" layout="carousel" />
                  </div>
                  <div>
                    <BrandText weight="medium" className="mb-3">Brand Icons</BrandText>
                    <BrandAssetShowcase filter="icon" layout="carousel" />
                  </div>
                </BrandGrid>
                <div className="mt-6">
                  <BrandText weight="medium" className="mb-3">Brand Images & Patterns</BrandText>
                  <BrandAssetShowcase 
                    filter="image"
                    layout="grid"
                    size="sm"
                  />
                </div>
              </CardContent>
            )}
          </BrandCard>
        )}
        
        {/* Stats overview */}
        <BrandGrid columns={4} gap="md" responsive>
          {statCards.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </BrandGrid>
        
        {/* Performance Metrics Section */}
        <BrandHeading level={2} className="mt-10 mb-6">Performance Metrics</BrandHeading>
        
        <BrandGrid columns={2} gap="md" responsive>
          {/* Top Projects by Views */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Top Projects by Views</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="bar"
                data={data.viewCountData}
                height={250}
                showValues
              />
            </CardContent>
            <CardFooter>
              <BrandText size="sm" color="muted">Total views across all projects: {data.totalViews.toLocaleString()}</BrandText>
            </CardFooter>
          </BrandCard>
          
          {/* Engagement Rate */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Engagement Rate</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="bar"
                data={data.engagementData}
                height={250}
                showValues
              />
            </CardContent>
            <CardFooter>
              <BrandText size="sm" color="muted">Average engagement rate: {Math.round(data.avgEngagement)}%</BrandText>
            </CardFooter>
          </BrandCard>
          
          {/* Conversion Rate */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Conversion Rate</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="bar"
                data={data.conversionRateData}
                height={250}
                showValues
              />
            </CardContent>
            <CardFooter>
              <BrandText size="sm" color="muted">Average conversion rate: {data.avgConversion.toFixed(1)}%</BrandText>
            </CardFooter>
          </BrandCard>
          
          {/* ROI Analysis */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>ROI Analysis</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="bar"
                data={data.roiData}
                height={250}
                showValues
              />
            </CardContent>
            <CardFooter>
              <BrandText size="sm" color="muted">Higher percentages indicate better return on investment</BrandText>
            </CardFooter>
          </BrandCard>
        </BrandGrid>
        
        {/* Budget Section */}
        <BrandHeading level={2} className="mt-10 mb-6">Budget and Resources</BrandHeading>
        
        {/* Budget vs Spent */}
        <BrandCard className="mb-8">
          <CardHeader>
            <CardTitle>
              <BrandHeading level={4}>Budget vs Spent</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BrandChart
              type="bar"
              data={data.budgetSpentData}
              height={300}
              showValues
            />
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <BrandText size="sm" color="muted">Total budget: {formatCurrency(data.totalBudget)}</BrandText>
              <BrandText size="sm" color="muted">Total spent: {formatCurrency(data.totalSpent)}</BrandText>
              <BrandText size="sm" color={data.totalSpent <= data.totalBudget ? "accent" : "secondary"} className={data.totalSpent <= data.totalBudget ? "text-emerald-500" : "text-rose-500"}>
                Remaining: {formatCurrency(data.totalBudget - data.totalSpent)}
              </BrandText>
            </div>
          </CardFooter>
        </BrandCard>
        
        {/* Project Status Section */}
        <BrandHeading level={2} className="mt-10 mb-6">Project Status</BrandHeading>
        
        <BrandGrid columns={2} gap="md" responsive className="mb-8">
          {/* Project Status */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Project Status Distribution</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="pie"
                data={data.projectStatusData}
                height={250}
                showLegend
                showValues
              />
            </CardContent>
          </BrandCard>
          
          {/* Brand Usage */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Brand Usage</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="bar"
                data={data.brandUsageData}
                height={250}
                showValues
              />
            </CardContent>
          </BrandCard>
        </BrandGrid>
        
        {/* Project Progress Section */}
        <BrandCard className="mb-8">
          <CardHeader>
            <CardTitle>
              <BrandHeading level={4}>Project Progress</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BrandChart
              type="progress"
              data={data.projectProgressData}
              height={300}
              maxValue={100}
              showValues
              showLabels
            />
          </CardContent>
        </BrandCard>
        
        {/* Team and Activity Section */}
        <BrandHeading level={2} className="mt-10 mb-6">Team and Activity</BrandHeading>
        
        <BrandGrid columns={2} gap="md" responsive>
          {/* Monthly Activity */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Monthly Activity</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="line"
                data={data.timelineData}
                height={250}
                width={500}
                showValues
              />
            </CardContent>
          </BrandCard>
          
          {/* Team Size */}
          <BrandCard>
            <CardHeader>
              <CardTitle>
                <BrandHeading level={4}>Team Size by Project</BrandHeading>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrandChart
                type="bar"
                data={data.teamSizeData}
                height={250}
                showValues
              />
            </CardContent>
          </BrandCard>
        </BrandGrid>
      </BrandContainer>
    </DashboardLayout>
  );
} 