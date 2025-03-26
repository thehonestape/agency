import { useEffect, useState } from 'react';
import { Card as ShadcnCard, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { ArrowUpRight, Globe, Search } from 'lucide-react';
import { 
  Card, 
  Title, 
  Text, 
  Metric, 
  Flex, 
  DonutChart, 
  BarChart, 
  Grid, 
  Col, 
  TabGroup, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel,
  Badge
} from '@tremor/react';
import {
  FadeIn,
  SlideUp,
  MotionCard,
  MotionList,
  MotionItem,
  WithTapHover
} from '../components/motion';
import { motion } from 'framer-motion';

// Define the data types
interface Page {
  id?: string;
  url: string;
  title: string;
  type?: string;
  elements?: Record<string, number>;
}

interface Link {
  source?: string;
  target?: string;
  from?: string;
  to?: string;
  text?: string;
}

interface SiteMapItem {
  path?: string;
  title?: string;
  id?: string;
}

interface ScrapedData {
  pages: Page[];
  links: Link[];
  siteMap: Record<string, string[] | SiteMapItem[]>;
  pageTypes: Record<string, number | string[]>;
}

export default function DataExplorerPage() {
  const [data, setData] = useState<ScrapedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Try fetching from our data-explorer server
        const response = await fetch('http://localhost:3030/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Error fetching scraped data:', err);
        setError('Could not load scraped data. Make sure the data-explorer server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openExternalDataExplorer = () => {
    window.open('http://localhost:3030', '_blank');
  };

  // Format page types data for the donut chart
  const formatPageTypesForChart = () => {
    if (!data || !data.pageTypes) return [];
    
    return Object.entries(data.pageTypes).map(([name, value]) => ({
      name,
      value: typeof value === 'number' ? value : (Array.isArray(value) ? value.length : 0)
    }));
  }

  // Format domain data for the bar chart
  const formatDomainsForChart = () => {
    if (!data || !data.siteMap) return [];
    
    return Object.entries(data.siteMap).map(([domain, pages]) => ({
      domain,
      pages: Array.isArray(pages) ? pages.length : 0
    })).sort((a, b) => b.pages - a.pages).slice(0, 10);
  }

  return (
    <div className="container mx-auto py-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Web Audit Explorer</h1>
            <p className="text-gray-500">
              Explore and analyze website structure and content
            </p>
          </div>
          <WithTapHover>
            <Button onClick={openExternalDataExplorer} className="flex gap-2 items-center">
              <Globe className="w-4 h-4" /> Open Full Explorer
            </Button>
          </WithTapHover>
        </div>
      </FadeIn>

      {loading ? (
        <FadeIn className="flex justify-center items-center h-64">
          <motion.div 
            className="rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </FadeIn>
      ) : error ? (
        <FadeIn>
          <ShadcnCard>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Search className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Data Not Available</h3>
                <p className="text-gray-500 max-w-md mb-6">{error}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <WithTapHover>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                      Try Again
                    </Button>
                  </WithTapHover>
                  <WithTapHover>
                    <Button onClick={openExternalDataExplorer} className="flex gap-2 items-center">
                      <ArrowUpRight className="w-4 h-4" /> Open Data Explorer Server
                    </Button>
                  </WithTapHover>
                </div>
              </div>
            </CardContent>
          </ShadcnCard>
        </FadeIn>
      ) : (
        <>
          {/* Summary Cards */}
          <MotionList className="mb-6">
            <Grid numItemsSm={2} numItemsLg={4} className="gap-4">
              <MotionItem>
                <MotionCard>
                  <Card>
                    <Flex alignItems="start">
                      <div>
                        <Text>Total Pages</Text>
                        <Metric>{data?.pages.length || 0}</Metric>
                      </div>
                    </Flex>
                  </Card>
                </MotionCard>
              </MotionItem>
              <MotionItem>
                <MotionCard>
                  <Card>
                    <Flex alignItems="start">
                      <div>
                        <Text>Total Domains</Text>
                        <Metric>{Object.keys(data?.siteMap || {}).length}</Metric>
                      </div>
                    </Flex>
                  </Card>
                </MotionCard>
              </MotionItem>
              <MotionItem>
                <MotionCard>
                  <Card>
                    <Flex alignItems="start">
                      <div>
                        <Text>Page Types</Text>
                        <Metric>{Object.keys(data?.pageTypes || {}).length}</Metric>
                      </div>
                    </Flex>
                  </Card>
                </MotionCard>
              </MotionItem>
              <MotionItem>
                <MotionCard>
                  <Card>
                    <Flex alignItems="start">
                      <div>
                        <Text>Total Links</Text>
                        <Metric>{data?.links.length || 0}</Metric>
                      </div>
                    </Flex>
                  </Card>
                </MotionCard>
              </MotionItem>
            </Grid>
          </MotionList>

          {/* Visualization Tabs */}
          <SlideUp delay={0.3}>
            <TabGroup className="mt-6">
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Pages</Tab>
                <Tab>Domains</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Grid numItemsMd={2} className="mt-6 gap-6">
                    {/* Page Types Donut */}
                    <MotionCard>
                      <Card>
                        <Title>Page Types Distribution</Title>
                        <Text>Breakdown of different page types across the site</Text>
                        <DonutChart
                          className="mt-6"
                          data={formatPageTypesForChart()}
                          category="value"
                          index="name"
                          colors={["blue", "cyan", "indigo", "violet", "fuchsia", "pink", "rose", "sky"]}
                          valueFormatter={(number) => `${number.toString()} pages`}
                        />
                      </Card>
                    </MotionCard>
                    
                    {/* Top Domains */}
                    <MotionCard>
                      <Card>
                        <Title>Top Domains by Page Count</Title>
                        <Text>Domains with the most pages</Text>
                        <BarChart
                          className="mt-6"
                          data={formatDomainsForChart()}
                          index="domain"
                          categories={["pages"]}
                          colors={["blue"]}
                          valueFormatter={(number) => `${number.toString()} pages`}
                          yAxisWidth={48}
                        />
                      </Card>
                    </MotionCard>
                  </Grid>
                </TabPanel>
                
                <TabPanel>
                  <MotionCard className="mt-6">
                    <Card>
                      <Title>Pages</Title>
                      <Text>List of scraped pages with basic information</Text>
                      
                      <div className="mt-6 rounded-md border overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100 border-b">
                              <th className="py-3 px-4 text-left font-medium">Title</th>
                              <th className="py-3 px-4 text-left font-medium">Type</th>
                              <th className="py-3 px-4 text-left font-medium">URL</th>
                              <th className="py-3 px-4 text-left font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.pages.slice(0, 10).map((page, index) => (
                              <motion.tr 
                                key={page.id || index} 
                                className="border-b"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                              >
                                <td className="py-3 px-4">{page.title || 'Untitled'}</td>
                                <td className="py-3 px-4">
                                  <Badge color={
                                    page.type === 'home' ? 'blue' : 
                                    page.type === 'about' ? 'green' : 
                                    page.type === 'contact' ? 'amber' : 
                                    page.type === 'portfolio' ? 'indigo' : 
                                    page.type === 'blog-list' ? 'pink' : 
                                    page.type === 'detail' ? 'violet' : 'gray'
                                  }>
                                    {page.type || 'unknown'}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4 max-w-[300px] truncate" title={page.url}>
                                  {page.url}
                                </td>
                                <td className="py-3 px-4">
                                  <WithTapHover>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => window.open(page.url, '_blank')}
                                    >
                                      <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                  </WithTapHover>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                        {(data?.pages.length || 0) > 10 && (
                          <div className="p-4 text-center text-sm text-gray-500">
                            Showing 10 of {data?.pages.length} pages. 
                            <WithTapHover>
                              <Button 
                                variant="link" 
                                onClick={openExternalDataExplorer}
                                className="inline-flex items-center gap-1"
                              >
                                Open Full Explorer <ArrowUpRight className="h-3 w-3" />
                              </Button>
                            </WithTapHover>
                          </div>
                        )}
                      </div>
                    </Card>
                  </MotionCard>
                </TabPanel>
                
                <TabPanel>
                  <MotionCard className="mt-6">
                    <Card>
                      <Title>Domains</Title>
                      <Text>List of domains found in the crawl</Text>
                      
                      <MotionList className="mt-6 space-y-4" staggerDelay={0.03}>
                        {Object.entries(data?.siteMap || {}).map(([domain, pages], index) => (
                          <MotionItem key={index}>
                            <div className="p-4 border rounded-lg">
                              <Flex>
                                <Text className="font-medium">{domain}</Text>
                                <Badge color="blue">{Array.isArray(pages) ? pages.length : 0} pages</Badge>
                              </Flex>
                            </div>
                          </MotionItem>
                        ))}
                      </MotionList>
                    </Card>
                  </MotionCard>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </SlideUp>
        </>
      )}
    </div>
  );
} 