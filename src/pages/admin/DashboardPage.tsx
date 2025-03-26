import { Card } from '../../components/ui';
import { Brain, Palette, BookOpen, Globe, Share2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Brand Memory',
    description: 'Capture and organize brand materials, insights, and knowledge',
    icon: <Brain className="size-6" />,
    href: '/admin/workhorse/memory',
    color: 'bg-purple-500/10 text-purple-500'
  },
  {
    title: 'Design',
    description: 'Manage design systems, assets, and visual guidelines',
    icon: <Palette className="size-6" />,
    href: '/admin/workhorse/design',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    title: 'Story',
    description: 'Develop and maintain brand narrative and messaging',
    icon: <BookOpen className="size-6" />,
    href: '/admin/workhorse/story',
    color: 'bg-green-500/10 text-green-500'
  },
  {
    title: 'Digital',
    description: 'Coordinate web presence and digital assets',
    icon: <Globe className="size-6" />,
    href: '/admin/workhorse/digital',
    color: 'bg-amber-500/10 text-amber-500'
  },
  {
    title: 'Social',
    description: 'Plan and track social media strategy',
    icon: <Share2 className="size-6" />,
    href: '/admin/workhorse/social',
    color: 'bg-pink-500/10 text-pink-500'
  },
  {
    title: 'Business',
    description: 'Monitor brand performance and business metrics',
    icon: <BarChart3 className="size-6" />,
    href: '/admin/workhorse/business',
    color: 'bg-indigo-500/10 text-indigo-500'
  }
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Brand Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your brand management dashboard. Select a section to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardCards.map((card) => (
          <Link key={card.title} to={card.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                  <p className="text-muted-foreground text-sm">{card.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 