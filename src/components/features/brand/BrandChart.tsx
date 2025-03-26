import React from "react";
import { useBrand, useBrandColors } from "./BrandProvider";
import { BrandText } from "./BrandText";
import { BrandHeading } from "./BrandHeading";

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BrandChartProps {
  data: ChartDataPoint[];
  type: "bar" | "line" | "pie" | "progress";
  title?: string;
  description?: string;
  height?: number;
  width?: number;
  showLabels?: boolean;
  showValues?: boolean;
  showLegend?: boolean;
  maxValue?: number;
  animated?: boolean;
  className?: string;
}

export function BrandChart({
  data,
  type,
  title,
  description,
  height = 200,
  width = 400,
  showLabels = true,
  showValues = true,
  showLegend = false,
  maxValue,
  animated = true,
  className = "",
}: BrandChartProps) {
  const { currentBrand } = useBrand();
  const brandColors = useBrandColors();
  
  // Get the brand's color palette for the chart
  const getChartColors = () => {
    // Start with brand colors
    const colors: string[] = brandColors
      .filter(color => color.value)
      .map(color => color.value);
    
    // If we need more colors than we have in the brand, generate some
    if (data.length > colors.length) {
      // Add some generated colors based on primary color
      const primaryColor = brandColors.find(c => c.isPrimary)?.value || "#1F2937";
      const generateColor = (index: number): string => {
        // Very simple color generation by adjusting hue
        if (primaryColor.startsWith('#')) {
          const r = parseInt(primaryColor.slice(1, 3), 16);
          const g = parseInt(primaryColor.slice(3, 5), 16);
          const b = parseInt(primaryColor.slice(5, 7), 16);
          
          // Adjust the green component based on index
          const newG = Math.min(255, Math.max(0, g + index * 20));
          return `rgb(${r}, ${newG}, ${b})`;
        }
        return primaryColor;
      };
      
      for (let i = colors.length; i < data.length; i++) {
        colors.push(generateColor(i));
      }
    }
    
    return colors;
  };
  
  const chartColors = getChartColors();
  
  // Assign colors to data points if they don't already have one
  const coloredData = data.map((point, index) => ({
    ...point,
    color: point.color || chartColors[index % chartColors.length]
  }));
  
  // Calculate the maximum value for scaling
  const calculatedMaxValue = maxValue || Math.max(...data.map(d => d.value)) * 1.1;
  
  // Render a bar chart
  const renderBarChart = () => {
    return (
      <div 
        className="flex items-end justify-between h-full w-full" 
        style={{ height: `${height}px` }}
      >
        {coloredData.map((point, index) => {
          const barHeight = (point.value / calculatedMaxValue) * 100;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center justify-end"
              style={{ height: "100%", width: `${100 / coloredData.length}%` }}
            >
              <div 
                className={`w-4/5 rounded-t-md transition-all duration-500 ${animated ? "animate-grow-up" : ""}`}
                style={{ 
                  height: `${barHeight}%`, 
                  backgroundColor: point.color,
                  transitionDelay: `${index * 100}ms`
                }}
              />
              {showLabels && (
                <BrandText 
                  size="xs" 
                  className="mt-2 text-center truncate w-full"
                >
                  {point.label}
                </BrandText>
              )}
              {showValues && (
                <BrandText 
                  size="xs" 
                  weight="medium" 
                  className="absolute text-center"
                  style={{ 
                    bottom: `${barHeight + 5}%`,
                    left: `${(index + 0.5) * (100 / coloredData.length)}%`,
                    transform: "translateX(-50%)"
                  }}
                >
                  {point.value}
                </BrandText>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render a simple line chart
  const renderLineChart = () => {
    // Calculate points for SVG polyline
    const calculatePoints = () => {
      const padding = 20;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
      
      return coloredData.map((point, index) => {
        const x = padding + (index / (coloredData.length - 1)) * chartWidth;
        const y = height - padding - (point.value / calculatedMaxValue) * chartHeight;
        return `${x},${y}`;
      }).join(" ");
    };
    
    const points = calculatePoints();
    
    return (
      <div className="relative" style={{ height: `${height}px`, width: `${width}px` }}>
        <svg width={width} height={height} className="overflow-visible">
          {/* Axes */}
          <line 
            x1="20" 
            y1={height - 20} 
            x2={width - 20} 
            y2={height - 20} 
            stroke="#ccc" 
            strokeWidth="1"
          />
          <line 
            x1="20" 
            y1="20" 
            x2="20" 
            y2={height - 20} 
            stroke="#ccc" 
            strokeWidth="1"
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={chartColors[0]}
            strokeWidth="2"
            className={animated ? "chart-line-animation" : ""}
          />
          
          {/* Points */}
          {coloredData.map((point, index) => {
            const x = 20 + (index / (coloredData.length - 1)) * (width - 40);
            const y = height - 20 - (point.value / calculatedMaxValue) * (height - 40);
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={point.color}
                  stroke="white"
                  strokeWidth="1"
                  className={animated ? "chart-point-animation" : ""}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
                
                {showValues && (
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {point.value}
                  </text>
                )}
                
                {showLabels && (
                  <text
                    x={x}
                    y={height - 5}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {point.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };
  
  // Render a pie chart
  const renderPieChart = () => {
    const total = coloredData.reduce((sum, point) => sum + point.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="flex justify-center items-center" style={{ height: `${height}px` }}>
        <div className="relative" style={{ width: `${height * 0.8}px`, height: `${height * 0.8}px` }}>
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100"
            style={{ transform: "rotate(-90deg)" }}
          >
            {coloredData.map((point, index) => {
              // Calculate the slice
              const percentage = point.value / total;
              const angle = percentage * 360;
              
              // Calculate the SVG arc path
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle = endAngle;
              
              const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
              
              // Determine which arc to use (large or small)
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              // Create the path
              const path = [
                `M 50 50`,
                `L ${x1} ${y1}`,
                `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(" ");
              
              return (
                <path
                  key={index}
                  d={path}
                  fill={point.color}
                  stroke="white"
                  strokeWidth="0.5"
                  className={animated ? "pie-slice-animation" : ""}
                  style={{ animationDelay: `${index * 150}ms` }}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        {showLegend && (
          <div className="ml-4 space-y-2">
            {coloredData.map((point, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 mr-2 rounded-sm" 
                  style={{ backgroundColor: point.color }}
                />
                <BrandText size="xs">
                  {point.label}{showValues && `: ${point.value} (${Math.round((point.value / total) * 100)}%)`}
                </BrandText>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Render progress bars
  const renderProgressBars = () => {
    return (
      <div className="space-y-4 w-full" style={{ height: `${height}px`, overflowY: 'auto' }}>
        {coloredData.map((point, index) => {
          const percentage = maxValue 
            ? (point.value / maxValue) * 100
            : point.value;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between">
                {showLabels && (
                  <BrandText size="xs">{point.label}</BrandText>
                )}
                {showValues && (
                  <BrandText size="xs" weight="medium">{percentage.toFixed(1)}%</BrandText>
                )}
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: animated ? '0%' : `${percentage}%`,
                    backgroundColor: point.color,
                    animation: animated ? `progress-grow 1s ease-out ${index * 0.2}s forwards` : 'none'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render the appropriate chart type
  const renderChart = () => {
    switch(type) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      case 'progress':
        return renderProgressBars();
      default:
        return <div>Chart type not supported</div>;
    }
  };
  
  return (
    <div className={`brand-chart ${className}`}>
      {title && <BrandHeading level={4} className="mb-1">{title}</BrandHeading>}
      {description && <BrandText size="sm" color="muted" className="mb-4">{description}</BrandText>}
      {renderChart()}
      
      <style>{`
        @keyframes progress-grow {
          from { width: 0%; }
          to { width: ${maxValue ? Math.min(100, (data.map(d => d.value).reduce((a, b) => Math.max(a, b), 0) / maxValue) * 100) : 100}%; }
        }
        
        .chart-line-animation {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 1.5s ease-out forwards;
        }
        
        .chart-point-animation {
          opacity: 0;
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .pie-slice-animation {
          opacity: 0;
          transform-origin: center;
          animation: pieGrow 0.5s ease-out forwards;
        }
        
        .animate-grow-up {
          animation: growUp 0.5s ease-out forwards;
        }
        
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        @keyframes pieGrow {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes growUp {
          from { height: 0; }
        }
      `}</style>
    </div>
  );
} 