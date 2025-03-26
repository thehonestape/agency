import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BrandHeading } from '../brand/BrandHeading';
import { BrandText } from '../brand/BrandText';
import { BrandCard, CardContent, CardHeader, CardTitle } from '../brand/BrandCard';
import { BrandStyledButton } from '../brand/BrandStyledButton';
import { BrandContainer } from '../brand/BrandContainer';
import { FiDownload, FiShare2 } from 'react-icons/fi';
import { defaultSiteStructure } from './defaultSiteStructure';

// Define the site structure types
export interface SiteNode {
  name: string;
  path?: string;
  children?: SiteNode[];
}

export interface SiteStructure {
  name: string;
  path: string;
  children: SiteNode[];
}

interface SitemapGeneratorProps {
  customSiteStructure?: SiteStructure;
}

const colors = {
  node: '#1A2B5F',
  text: '#FFFFFF',
  line: '#708090',
  background: '#F7F7F7',
  highlight: '#FF6B6B'
};

export function SitemapGenerator({ customSiteStructure }: SitemapGeneratorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Use provided custom structure or fallback to default
  const siteStructure = customSiteStructure || defaultSiteStructure;

  // Function to download the SVG
  const downloadSvg = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'workhorse-sitemap.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Calculate dimensions
  const width = 1200;
  const height = 800;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const nodeRadius = 12;
  const levelHeight = 100;

  // Render the sitemap visualization
  return (
    <BrandContainer>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <BrandHeading level={1}>Workhorse Sitemap</BrandHeading>
            <BrandText color="muted">
              Visual representation of the application structure
            </BrandText>
          </div>
          <div className="flex gap-2">
            <BrandStyledButton onClick={downloadSvg}>
              <FiDownload className="mr-2" />
              Download SVG
            </BrandStyledButton>
          </div>
        </div>

        <BrandCard className="overflow-x-auto">
          <CardContent>
            <svg 
              ref={svgRef} 
              width={width} 
              height={height} 
              viewBox={`0 0 ${width} ${height}`}
              style={{ background: colors.background }}
            >
              {/* Root Node */}
              <g transform={`translate(${width / 2}, ${margin.top})`}>
                <circle r={nodeRadius} fill={colors.node} />
                <text y={-20} textAnchor="middle" fill={colors.node} fontSize="14px" fontWeight="bold">
                  {siteStructure.name}
                </text>
                
                {/* Level 1 Nodes - Main Categories */}
                {siteStructure.children.map((category, i) => {
                  const total = siteStructure.children.length;
                  const angle = ((i / total) * 2 * Math.PI) - (Math.PI / 2);
                  const radius = 150;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius + levelHeight;
                  
                  return (
                    <g key={`category-${i}`}>
                      {/* Line from root to category */}
                      <line 
                        x1={0} 
                        y1={0} 
                        x2={x} 
                        y2={y} 
                        stroke={colors.line} 
                        strokeWidth={1.5} 
                      />
                      
                      {/* Category Node */}
                      <g transform={`translate(${x}, ${y})`}>
                        <circle r={nodeRadius} fill={colors.node} />
                        <text y={-15} textAnchor="middle" fill={colors.node} fontSize="12px" fontWeight="bold">
                          {category.name}
                        </text>
                        
                        {/* Level 2 Nodes - Pages */}
                        {category.children && category.children.map((page, j) => {
                          const pageTotal = category.children.length;
                          const spreadAngle = Math.PI / 2; // 90 degrees spread
                          const startAngle = angle - (spreadAngle / 2);
                          const pageAngle = startAngle + ((j / (pageTotal - 1 || 1)) * spreadAngle);
                          const pageRadius = 100;
                          const pageX = Math.cos(pageAngle) * pageRadius;
                          const pageY = Math.sin(pageAngle) * pageRadius;
                          
                          return (
                            <g key={`page-${i}-${j}`}>
                              {/* Line from category to page */}
                              <line 
                                x1={0} 
                                y1={0} 
                                x2={pageX} 
                                y2={pageY} 
                                stroke={colors.line} 
                                strokeWidth={1} 
                              />
                              
                              {/* Page Node */}
                              <g transform={`translate(${pageX}, ${pageY})`}>
                                <circle r={8} fill={page.path === '/brands/workhorse' ? colors.highlight : colors.node} />
                                <text 
                                  y={-10} 
                                  textAnchor={pageAngle > Math.PI ? "end" : "start"}
                                  fill={colors.node} 
                                  fontSize="10px"
                                  transform={`rotate(${pageAngle > Math.PI ? 30 : -30})`}
                                >
                                  {page.name}
                                </text>
                              </g>
                            </g>
                          );
                        })}
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </CardContent>
        </BrandCard>

        <BrandCard>
          <CardHeader>
            <CardTitle>
              <BrandHeading level={3}>Site Structure</BrandHeading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {siteStructure.children.map((category, i) => (
                <div key={`list-${i}`} className="border-b pb-4 last:border-0 last:pb-0">
                  <BrandText weight="medium" className="mb-2">{category.name}</BrandText>
                  <ul className="grid grid-cols-2 gap-2">
                    {category.children && category.children.map((page, j) => (
                      <li key={`list-item-${i}-${j}`}>
                        {page.path ? (
                          <Link to={page.path} className="text-primary hover:underline">
                            {page.name}
                          </Link>
                        ) : (
                          <BrandText>{page.name}</BrandText>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </BrandCard>
      </div>
    </BrandContainer>
  );
} 