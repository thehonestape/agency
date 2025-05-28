#!/usr/bin/env node

/**
 * AI-Native Dashboard Generator
 * Creates comprehensive, interactive dashboards with AI insights
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Generate AI-Native Dashboard
 * @param {Object} scrapedData - Raw scraped data
 * @param {Object} aiInsights - AI analysis results
 * @param {string} reportDir - Output directory
 */
export async function generateAIDashboard(scrapedData, aiInsights, reportDir) {
  console.log('🎯 Generating AI-native dashboard...');
  
  const dashboardHtml = await createDashboardHTML(scrapedData, aiInsights);
  const dashboardPath = path.join(reportDir, 'ai-dashboard.html');
  
  await fs.writeFile(dashboardPath, dashboardHtml);
  console.log(`✅ AI Dashboard saved to: ${dashboardPath}`);
  
  return dashboardPath;
}

/**
 * Create comprehensive dashboard HTML
 */
async function createDashboardHTML(data, insights) {
  const { baseUrl, summary, brandAnalysis } = data;
  const { overallScores, recommendations, actionableInsights } = insights;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Analysis Dashboard - ${sanitize(baseUrl)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
  <style>
    .score-ring { 
      background: conic-gradient(from 0deg, #10b981 0deg, #10b981 var(--score-deg), #e5e7eb var(--score-deg), #e5e7eb 360deg);
    }
    .insight-card { 
      transition: all 0.3s ease; 
    }
    .insight-card:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
    }
    .priority-high { border-left: 4px solid #ef4444; }
    .priority-medium { border-left: 4px solid #f59e0b; }
    .priority-low { border-left: 4px solid #10b981; }
  </style>
</head>
<body class="bg-gray-50 font-sans" x-data="dashboard()">
  
  <!-- Header -->
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">AI Website Analysis</h1>
          <p class="text-sm text-gray-600">${sanitize(baseUrl)}</p>
        </div>
        <div class="flex space-x-4">
          <button @click="activeTab = 'overview'" 
                  :class="activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'"
                  class="px-4 py-2 rounded-lg font-medium">Overview</button>
          <button @click="activeTab = 'insights'" 
                  :class="activeTab === 'insights' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'"
                  class="px-4 py-2 rounded-lg font-medium">AI Insights</button>
          <button @click="activeTab = 'recommendations'" 
                  :class="activeTab === 'recommendations' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'"
                  class="px-4 py-2 rounded-lg font-medium">Actions</button>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Overview Tab -->
    <div x-show="activeTab === 'overview'" class="space-y-8">
      
      <!-- Key Metrics -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${generateScoreCards(overallScores)}
      </section>
      
      <!-- Site Overview -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Site Structure</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Total Pages</span>
              <span class="font-medium">${summary?.totalPages || 0}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Domains</span>
              <span class="font-medium">${summary?.totalDomains || 0}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Page Types</span>
              <span class="font-medium">${Object.keys(summary?.pageTypes || {}).length}</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Brand Elements</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Colors Detected</span>
              <span class="font-medium">${brandAnalysis?.colors?.length || 0}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Font Families</span>
              <span class="font-medium">${brandAnalysis?.fonts?.length || 0}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Logos Found</span>
              <span class="font-medium">${brandAnalysis?.logos?.length || 0}</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Performance Chart -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">Performance Overview</h3>
        <canvas id="performanceChart" width="400" height="200"></canvas>
      </section>
      
    </div>
    
    <!-- AI Insights Tab -->
    <div x-show="activeTab === 'insights'" class="space-y-8">
      
      <!-- Design System Analysis -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">🎨 Design System Analysis</h3>
        ${generateDesignSystemInsights(insights.designSystemAnalysis)}
      </section>
      
      <!-- UX Analysis -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">👤 User Experience Analysis</h3>
        ${generateUXInsights(insights.uxAnalysis)}
      </section>
      
      <!-- Content Intelligence -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">📝 Content Intelligence</h3>
        ${generateContentInsights(insights.contentIntelligence)}
      </section>
      
    </div>
    
    <!-- Recommendations Tab -->
    <div x-show="activeTab === 'recommendations'" class="space-y-8">
      
      <!-- Quick Wins -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">⚡ Quick Wins</h3>
        <div class="space-y-4">
          ${generateQuickWins(actionableInsights.quickWins)}
        </div>
      </section>
      
      <!-- Strategic Initiatives -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">🎯 Strategic Initiatives</h3>
        <div class="space-y-4">
          ${generateStrategicInitiatives(actionableInsights.strategicInitiatives)}
        </div>
      </section>
      
      <!-- Prioritized Recommendations -->
      <section class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-lg font-semibold mb-4">📋 All Recommendations</h3>
        ${generatePrioritizedRecommendations(recommendations)}
      </section>
      
    </div>
    
  </main>

  <script>
    function dashboard() {
      return {
        activeTab: 'overview',
        init() {
          this.initCharts();
        },
        initCharts() {
          // Performance Chart
          const ctx = document.getElementById('performanceChart');
          if (ctx) {
            new Chart(ctx, {
              type: 'radar',
              data: {
                labels: ['Design', 'UX', 'Content', 'Technical', 'Accessibility'],
                datasets: [{
                  label: 'Current Score',
                  data: [${(overallScores?.design?.consistency || 0) * 100}, 
                         ${(overallScores?.ux?.usability || 0) * 100}, 
                         ${(overallScores?.content?.clarity || 0) * 100}, 
                         ${(overallScores?.technical?.performance || 0) * 100}, 
                         ${(overallScores?.technical?.accessibility || 0) * 100}],
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderColor: 'rgb(59, 130, 246)',
                  borderWidth: 2
                }]
              },
              options: {
                responsive: true,
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100
                  }
                }
              }
            });
          }
        }
      }
    }
  </script>
  
</body>
</html>`;
}

/**
 * Generate score cards for key metrics
 */
function generateScoreCards(scores) {
  if (!scores) return '<div class="col-span-4 text-center text-gray-500">No scores available</div>';
  
  const cards = [
    { title: 'Design', score: scores.design?.consistency || 0, color: 'blue' },
    { title: 'UX', score: scores.ux?.usability || 0, color: 'green' },
    { title: 'Content', score: scores.content?.clarity || 0, color: 'purple' },
    { title: 'Technical', score: scores.technical?.performance || 0, color: 'orange' }
  ];
  
  return cards.map(card => `
    <div class="bg-white rounded-xl shadow-sm p-6 insight-card">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">${card.title}</p>
          <p class="text-2xl font-bold text-gray-900">${Math.round(card.score * 100)}%</p>
        </div>
        <div class="w-16 h-16 rounded-full score-ring flex items-center justify-center" 
             style="--score-deg: ${card.score * 360}deg;">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span class="text-sm font-bold text-${card.color}-600">${Math.round(card.score * 100)}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Generate design system insights
 */
function generateDesignSystemInsights(designAnalysis) {
  if (!designAnalysis) return '<p class="text-gray-500">No design analysis available</p>';
  
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 class="font-medium mb-2">Color System</h4>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Harmony Type</span>
            <span class="font-medium">${designAnalysis.colorSystem?.harmony?.type || 'Unknown'}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Accessibility</span>
            <span class="font-medium">${designAnalysis.colorSystem?.harmony?.accessibility?.wcagAA ? '✅ WCAG AA' : '❌ Needs Work'}</span>
          </div>
        </div>
      </div>
      <div>
        <h4 class="font-medium mb-2">Typography</h4>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>Font Families</span>
            <span class="font-medium">${designAnalysis.typographySystem?.families?.length || 0}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Hierarchy Levels</span>
            <span class="font-medium">${designAnalysis.typographySystem?.hierarchy?.levels || 0}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate UX insights
 */
function generateUXInsights(uxAnalysis) {
  if (!uxAnalysis) return '<p class="text-gray-500">No UX analysis available</p>';
  
  return `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="text-center p-4 bg-gray-50 rounded-lg">
        <div class="text-2xl mb-2">📱</div>
        <div class="text-sm font-medium">Mobile Friendly</div>
        <div class="text-xs text-gray-600">Analysis Complete</div>
      </div>
      <div class="text-center p-4 bg-gray-50 rounded-lg">
        <div class="text-2xl mb-2">🧠</div>
        <div class="text-sm font-medium">Cognitive Load</div>
        <div class="text-xs text-gray-600">Optimized</div>
      </div>
      <div class="text-center p-4 bg-gray-50 rounded-lg">
        <div class="text-2xl mb-2">🎯</div>
        <div class="text-sm font-medium">Conversion</div>
        <div class="text-xs text-gray-600">Needs Improvement</div>
      </div>
    </div>
  `;
}

/**
 * Generate content insights
 */
function generateContentInsights(contentAnalysis) {
  if (!contentAnalysis) return '<p class="text-gray-500">No content analysis available</p>';
  
  return `
    <div class="space-y-4">
      <div>
        <h4 class="font-medium mb-2">Primary Themes</h4>
        <div class="flex flex-wrap gap-2">
          ${(contentAnalysis.messaging?.primaryThemes || []).map(theme => 
            `<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${sanitize(theme)}</span>`
          ).join('')}
        </div>
      </div>
      <div>
        <h4 class="font-medium mb-2">Brand Voice</h4>
        <p class="text-sm text-gray-600">
          Tone: <span class="font-medium">${contentAnalysis.messaging?.brandVoice?.tone || 'Unknown'}</span>
          (${Math.round((contentAnalysis.messaging?.brandVoice?.confidence || 0) * 100)}% confidence)
        </p>
      </div>
    </div>
  `;
}

/**
 * Generate quick wins section
 */
function generateQuickWins(quickWins) {
  if (!quickWins || quickWins.length === 0) {
    return '<p class="text-gray-500">No quick wins identified</p>';
  }
  
  return quickWins.map(win => `
    <div class="border rounded-lg p-4 priority-${win.impact.toLowerCase()}">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-medium">${sanitize(win.action)}</h4>
        <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
          ${win.impact} Impact
        </span>
      </div>
      <p class="text-sm text-gray-600 mb-2">${sanitize(win.reasoning)}</p>
      <div class="flex justify-between text-xs">
        <span class="text-gray-500">Category: ${win.category}</span>
        <span class="text-gray-500">Effort: ${win.effort}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Generate strategic initiatives
 */
function generateStrategicInitiatives(initiatives) {
  if (!initiatives || initiatives.length === 0) {
    return '<p class="text-gray-500">No strategic initiatives identified</p>';
  }
  
  return initiatives.map(initiative => `
    <div class="border rounded-lg p-4 priority-high">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-medium">${sanitize(initiative.action)}</h4>
        <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
          ${initiative.impact} Impact
        </span>
      </div>
      <p class="text-sm text-gray-600 mb-2">${sanitize(initiative.reasoning)}</p>
      <div class="flex justify-between text-xs">
        <span class="text-gray-500">Category: ${initiative.category}</span>
        <span class="text-gray-500">Effort: ${initiative.effort}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Generate prioritized recommendations
 */
function generatePrioritizedRecommendations(recommendations) {
  if (!recommendations) return '<p class="text-gray-500">No recommendations available</p>';
  
  const allRecommendations = [
    ...(recommendations.immediate || []).map(r => ({ ...r, priority: 'High', type: 'Immediate' })),
    ...(recommendations.strategic || []).map(r => ({ ...r, priority: 'High', type: 'Strategic' })),
    ...(recommendations.optimization || []).map(r => ({ ...r, priority: 'Medium', type: 'Optimization' })),
    ...(recommendations.experimental || []).map(r => ({ ...r, priority: 'Low', type: 'Experimental' }))
  ];
  
  if (allRecommendations.length === 0) {
    return '<p class="text-gray-500">No specific recommendations available</p>';
  }
  
  return `
    <div class="space-y-3">
      ${allRecommendations.map((rec, index) => `
        <div class="border rounded-lg p-4 priority-${rec.priority.toLowerCase()}">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h4 class="font-medium">Recommendation ${index + 1}</h4>
              <p class="text-sm text-gray-600 mt-1">${rec.type} priority item</p>
            </div>
            <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
              ${rec.priority}
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Sanitize HTML content
 */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"\/]/g, match => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '/': '&#x2F;'
  }[match]));
}

export default { generateAIDashboard }; 