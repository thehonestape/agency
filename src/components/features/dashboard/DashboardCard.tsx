import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/button";
import { CircleOff, TrendingDown, TrendingUp, AlertCircle, CheckCircle, HelpCircle, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

// Define variants for the dashboard card
const dashboardCardVariants = cva("", {
  variants: {
    status: {
      success: "border-l-4 border-l-success",
      warning: "border-l-4 border-l-warning",
      error: "border-l-4 border-l-destructive",
      info: "border-l-4 border-l-info",
      neutral: "",
      loading: "animate-pulse",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
    importance: {
      low: "opacity-80",
      medium: "opacity-90",
      high: "opacity-100",
    }
  },
  defaultVariants: {
    status: "neutral",
    size: "default",
    importance: "medium",
  }
});

// Types for value changes
export type ValueChangeType = "increase" | "decrease" | "neutral" | "unknown";

// Compound type for dashboard card props
export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof dashboardCardVariants> {
  title: string;
  description?: string;
  value?: string | number;
  previousValue?: string | number;
  changeType?: ValueChangeType;
  changePercentage?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  interactive?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onClick?: () => void;
  footerContent?: React.ReactNode;
}

/**
 * DashboardCard component
 * 
 * A card component designed for dashboards that implements:
 * - Perceptual Clarity: through clear visual hierarchy and status indicators
 * - Cognitive Efficiency: by organizing information in a consistent way
 * - Emotional Resonance: with micro-interactions and appropriate visual feedback
 * - Interaction Integrity: with clear interactive states
 */
export function DashboardCard({
  className,
  status,
  size,
  importance,
  title,
  description,
  value,
  previousValue,
  changeType = "neutral",
  changePercentage,
  icon,
  loading = false,
  interactive = false,
  actionLabel,
  onAction,
  onClick,
  footerContent,
  children,
  ...props
}: DashboardCardProps) {
  // Determine status icon based on the status prop
  const StatusIcon = React.useMemo(() => {
    if (loading) return Loader2;
    
    switch (status) {
      case "success": return CheckCircle;
      case "warning": return AlertCircle;
      case "error": return CircleOff;
      case "info": return HelpCircle;
      default: return null;
    }
  }, [status, loading]);

  // Determine trend icon based on change type
  const TrendIcon = React.useMemo(() => {
    switch (changeType) {
      case "increase": return TrendingUp;
      case "decrease": return TrendingDown;
      default: return null;
    }
  }, [changeType]);

  // Format change percentage with + or - sign
  const formattedChangePercentage = React.useMemo(() => {
    if (changePercentage === undefined) return null;
    return `${changeType === "increase" ? "+" : changeType === "decrease" ? "-" : ""}${Math.abs(changePercentage).toFixed(1)}%`;
  }, [changePercentage, changeType]);

  // Determine value color based on change type
  const valueColorClass = React.useMemo(() => {
    if (changeType === "increase") return "text-success";
    if (changeType === "decrease") return "text-destructive";
    return "";
  }, [changeType]);

  return (
    <Card 
      className={cn(
        dashboardCardVariants({ status, size, importance }),
        interactive && "hover:shadow-md transition-all duration-200 cursor-pointer hover:translate-y-[-2px]",
        className
      )}
      onClick={interactive ? onClick : undefined}
      interactive={interactive}
      {...props}
    >
      <CardHeader className={cn("flex flex-row items-start justify-between space-y-0 gap-4 pb-2", 
        size === "sm" ? "p-3" : size === "lg" ? "p-6" : "p-4"
      )}>
        <div>
          <CardTitle className={cn(
            "flex items-center gap-2", 
            size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl"
          )}>
            {StatusIcon && <StatusIcon 
              className={cn(
                "inline-block", 
                status === "success" ? "text-success" : 
                status === "warning" ? "text-warning" : 
                status === "error" ? "text-destructive" : 
                status === "info" ? "text-info" : "text-muted-foreground",
                loading && "animate-spin",
                size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
              )} 
            />}
            {title}
          </CardTitle>
          {description && (
            <CardDescription className={size === "sm" ? "text-xs mt-1" : "mt-1"}>
              {description}
            </CardDescription>
          )}
        </div>
        {icon && (
          <div className={cn(
            "rounded-full p-2 bg-muted/50",
            size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className={cn(
        size === "sm" ? "p-3 pt-0" : size === "lg" ? "p-6 pt-0" : "p-4 pt-0"
      )}>
        {children ? (
          children
        ) : value ? (
          <div className="space-y-1">
            <div className={cn(
              "font-bold", 
              valueColorClass,
              size === "sm" ? "text-xl" : size === "lg" ? "text-4xl" : "text-3xl"
            )}>
              {loading ? (
                <div className="h-8 bg-muted animate-pulse rounded w-24" />
              ) : (
                value
              )}
            </div>
            {(previousValue || changePercentage !== undefined) && (
              <div className="flex items-center text-xs text-muted-foreground gap-1">
                {loading ? (
                  <div className="h-4 bg-muted animate-pulse rounded w-16" />
                ) : (
                  <>
                    {previousValue && <span>Previous: {previousValue}</span>}
                    {previousValue && changePercentage !== undefined && <span>•</span>}
                    {changePercentage !== undefined && (
                      <span className="flex items-center">
                        {TrendIcon && <TrendIcon className={cn(
                          "inline-block h-3 w-3 mr-1",
                          changeType === "increase" ? "text-success" : 
                          changeType === "decrease" ? "text-destructive" : 
                          "text-muted-foreground"
                        )} />}
                        <span className={cn(
                          changeType === "increase" ? "text-success" : 
                          changeType === "decrease" ? "text-destructive" : 
                          "text-muted-foreground"
                        )}>
                          {formattedChangePercentage}
                        </span>
                      </span>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
      {(actionLabel || footerContent) && (
        <CardFooter className={cn(
          "flex items-center",
          size === "sm" ? "p-3 pt-0" : size === "lg" ? "p-6 pt-0" : "p-4 pt-0"
        )}>
          {actionLabel && onAction ? (
            <Button 
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation();
                onAction();
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : actionLabel}
            </Button>
          ) : footerContent}
        </CardFooter>
      )}
    </Card>
  );
}

export default DashboardCard; 