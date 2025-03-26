import React from "react";
import { DashboardGrid, DashboardGridItem } from "./DashboardGrid";
import DashboardCard from "./DashboardCard";
import { 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  CreditCard, 
  Calendar,
  Zap,
  BarChart3,
  ActivitySquare
} from "lucide-react";
import { Button } from "../ui/button";

/**
 * DashboardExample
 * 
 * A complete dashboard example that showcases the design principles:
 * - Perceptual Clarity: Clear visual hierarchy and status indicators
 * - Cognitive Efficiency: Information grouped by relevance and importance
 * - Interaction Integrity: Obvious interactive elements
 * - Emotional Resonance: Feedback through colors and micro-interactions
 * - Adaptive Interfaces: Responsive layout that works on all devices
 */
export function DashboardExample() {
  const [loading, setLoading] = React.useState(false);
  
  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your metrics.</p>
        </div>
        <Button onClick={handleRefresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>
      
      <DashboardGrid 
        layout="dashboard" 
        priorityAreas 
        density="default"
      >
        {/* Priority card - will be larger due to priorityAreas being true */}
        <DashboardGridItem colSpan={2}>
          <DashboardCard
            status="success"
            importance="high"
            title="Monthly Revenue"
            description="Total revenue this month"
            value="$24,512"
            previousValue="$20,400"
            changeType="increase"
            changePercentage={12.5}
            icon={<CreditCard className="h-6 w-6 text-primary/70" />}
            loading={loading}
            interactive
            onClick={() => alert("Revenue card clicked")}
            actionLabel="View Report"
            onAction={() => alert("View Revenue Report")}
          />
        </DashboardGridItem>
        
        {/* Regular cards */}
        <DashboardCard
          status="info"
          title="Active Users"
          value="1,294"
          previousValue="1,145"
          changeType="increase"
          changePercentage={9.8}
          icon={<Users className="h-5 w-5 text-info/80" />}
          loading={loading}
        />
        
        <DashboardCard
          status="warning"
          title="Conversion Rate"
          value="4.6%"
          previousValue="5.1%"
          changeType="decrease"
          changePercentage={8.2}
          icon={<TrendingUp className="h-5 w-5 text-warning/80" />}
          loading={loading}
        />
        
        <DashboardCard
          title="Total Orders"
          value="642"
          previousValue="592"
          changeType="increase"
          changePercentage={7.3}
          icon={<ShoppingCart className="h-5 w-5 text-accent/70" />}
          loading={loading}
          interactive
          onClick={() => alert("Orders card clicked")}
        />
        
        <DashboardCard
          status="error"
          title="Refund Rate"
          value="1.8%"
          previousValue="1.1%"
          changeType="decrease"
          changePercentage={-38.9}
          icon={<ActivitySquare className="h-5 w-5 text-destructive/80" />}
          loading={loading}
        />
        
        <DashboardCard
          title="Avg. Session"
          value="8m 12s"
          previousValue="7m 45s"
          changeType="increase"
          changePercentage={6.5}
          icon={<Zap className="h-5 w-5 text-secondary-foreground/70" />}
          loading={loading}
        />
        
        <DashboardCard
          status="success"
          title="New Customers"
          value="89"
          previousValue="72"
          changeType="increase"
          changePercentage={23.6}
          icon={<BarChart3 className="h-5 w-5 text-success/80" />}
          loading={loading}
        />
        
        <DashboardCard
          title="Upcoming Events"
          value="12"
          icon={<Calendar className="h-5 w-5 text-secondary-foreground/70" />}
          loading={loading}
          actionLabel="View Calendar"
          onAction={() => alert("View Calendar")}
        />
      </DashboardGrid>
      
      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Performance By Department</h2>
        <DashboardGrid 
          layout="3-col" 
          density="default"
        >
          <DashboardCard
            title="Marketing"
            value="$12,500"
            previousValue="$11,200"
            changeType="increase"
            changePercentage={11.6}
            status="success"
            loading={loading}
          />
          
          <DashboardCard
            title="Sales"
            value="$8,410"
            previousValue="$9,100"
            changeType="decrease"
            changePercentage={7.6}
            status="warning"
            loading={loading}
          />
          
          <DashboardCard
            title="Product"
            value="$3,602"
            previousValue="$2,850"
            changeType="increase"
            changePercentage={26.4}
            status="success"
            loading={loading}
          />
        </DashboardGrid>
      </div>
    </div>
  );
}

export default DashboardExample; 