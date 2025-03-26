import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  FiLayout as LayoutDashboard, 
  FiFolder as FolderOpen, 
  FiPenTool as Palette, 
  FiShare2 as Share2, 
  FiMail as Mail, 
  FiSettings as Settings, 
  FiUsers as Users, 
  FiCalendar as Calendar,
  FiLayers as Layers,
  FiBarChart2 as BarChart,
  FiBox as Box,
  FiSliders as Sliders,
  FiMessageCircle as MessageCircle,
  FiFlag as Flag,
  FiTarget as Target,
  FiImage as Image,
  FiArchive as Archive,
  FiMap as Map,
  FiFileText as FileText,
  FiPlus as Plus,
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
  FiStar as Star,
  FiGrid as LayoutGrid,
  FiType as Typography,
  FiEdit3 as Paintbrush,
  FiDroplet as Droplet,
  FiMinimize2 as Minimize2
} from "react-icons/fi";

// Define a type for the section names to ensure type safety
type SectionName = "favorites" | "projects" | "brand" | "content" | "channel" | "team" | "ui" | "admin";

// Define the type for navigation items
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  section: SectionName;
  isFavorite?: boolean;
}

// SideNav props interface
interface SideNavProps {
  collapsed: boolean;
  onToggle: () => void;
}

// Organize navigation items based on the app flow
const navItems: NavItem[] = [
  // Projects section
  {
    name: "Latest Projects",
    href: "/projects",
    icon: FolderOpen,
    section: "projects",
    isFavorite: true
  },
  
  // New Project
  {
    name: "New Project",
    href: "/projects/new",
    icon: Plus,
    section: "projects"
  },
  {
    name: "New Document",
    href: "/documents/new",
    icon: FileText,
    section: "projects"
  },
  
  // Brand Framework section
  {
    name: "Brands",
    href: "/brands",
    icon: Palette,
    section: "brand",
    isFavorite: true
  },
  {
    name: "Brand Builder",
    href: "/brands/builder",
    icon: Layers,
    section: "brand",
    isFavorite: true
  },
  {
    name: "Workhorse Brand",
    href: "/brands/workhorse",
    icon: Layers,
    section: "brand"
  },
  {
    name: "Brand Analytics",
    href: "/brand-analytics",
    icon: BarChart,
    section: "brand"
  },
  
  // Content & Assets section
  {
    name: "Assets",
    href: "/assets",
    icon: Image,
    section: "content",
    isFavorite: true
  },
  {
    name: "Content Calendar",
    href: "/calendar",
    icon: Calendar,
    section: "content"
  },
  
  // Channels section
  {
    name: "Social Media",
    href: "/social",
    icon: Share2,
    section: "channel"
  },
  {
    name: "Email Marketing",
    href: "/email",
    icon: Mail,
    section: "channel",
    isFavorite: true
  },
  
  // Team & Collaboration section
  {
    name: "Team",
    href: "/team",
    icon: Users,
    section: "team"
  },
  {
    name: "Conversations",
    href: "/conversations",
    icon: MessageCircle,
    section: "team"
  },
  
  // UI Component Libraries (for development)
  {
    name: "Catalyst UI",
    href: "/catalyst-demo",
    icon: Box,
    section: "ui"
  },
  {
    name: "Themed UI",
    href: "/theme-demo",
    icon: Sliders,
    section: "ui"
  },
  {
    name: "Theme Showcase",
    href: "/theme-showcase",
    icon: Palette,
    section: "ui",
    isFavorite: true
  },
  {
    name: "Component Showcase",
    href: "/components/showcase",
    icon: Box,
    section: "ui"
  },
  {
    name: "Style Tile",
    href: "/style-tile",
    icon: Palette,
    section: "ui",
    isFavorite: true
  },
  {
    name: "UI Blocks",
    href: "/ui-blocks",
    icon: LayoutGrid,
    section: "ui",
    isFavorite: true
  },
  
  // Settings & Administration
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    section: "admin"
  },
  {
    name: "Sitemap",
    href: "/sitemap",
    icon: Map,
    section: "admin"
  },
];

// Group navigation items by section
const sectionTitles: Record<SectionName, string> = {
  favorites: "Favorites",
  projects: "Projects",
  brand: "Brand",
  content: "Content",
  channel: "Marketing",
  team: "Team",
  ui: "UI",
  admin: "Admin"
};

export function SideNav({ collapsed, onToggle }: SideNavProps) {
  const location = useLocation();
  const pathname = location.pathname;

  // Group sections by priority to reduce cognitive load
  const favoriteItems = navItems.filter(item => item.isFavorite);
  const sectionOrder: SectionName[] = ["projects", "brand", "content", "channel", "team", "ui", "admin"];
  
  const renderNavSection = (section: SectionName) => {
    const sectionItems = navItems.filter(item => item.section === section);
    
    // Only render sections that have items
    if (sectionItems.length === 0) return null;
    
    return (
      <div key={section} className={cn(
        "mb-2",
        collapsed ? "px-1.5" : "px-3"
      )}>
        {!collapsed && (
          <h3 className="mb-1 ml-2 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            {sectionTitles[section]}
          </h3>
        )}
        
        <div className="space-y-0.5">
          {sectionItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-md transition-colors",
                  collapsed 
                    ? "justify-center py-1.5 px-1.5" 
                    : "py-1.5 px-2 text-sm",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn(
                  "flex-shrink-0",
                  collapsed ? "h-4 w-4" : "mr-2 h-4 w-4"
                )} />
                
                {!collapsed && (
                  <span className="truncate text-sm font-medium">{item.name}</span>
                )}
                
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFavorites = () => {
    if (favoriteItems.length === 0) return null;
    
    return (
      <div className={cn(
        "mb-2",
        collapsed ? "px-1.5" : "px-3"
      )}>
        {!collapsed && (
          <h3 className="mb-1 ml-2 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            {sectionTitles.favorites}
          </h3>
        )}
        
        <div className="space-y-0.5">
          {favoriteItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-md transition-colors",
                  collapsed 
                    ? "justify-center py-1.5 px-1.5" 
                    : "py-1.5 px-2 text-sm",
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn(
                  "flex-shrink-0",
                  collapsed ? "h-4 w-4" : "mr-2 h-4 w-4"
                )} />
                
                {!collapsed && (
                  <span className="truncate text-sm font-medium">{item.name}</span>
                )}
                
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn(
      "h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300",
      collapsed ? "w-12" : "w-56"
    )}>
      <div className={cn(
        "flex h-14 items-center border-b border-gray-200 dark:border-gray-800",
        collapsed ? "justify-center px-2" : "px-4"
      )}>
        {collapsed ? (
          <div className="text-lg font-bold">WH</div>
        ) : (
          <Link to="/dashboard" className="flex items-center">
            <span className="text-lg font-bold">WORKHORSE</span>
          </Link>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {/* Favorites section */}
        {renderFavorites()}
        
        {!collapsed && (
          <div className="my-2 border-t border-gray-200 dark:border-gray-800 mx-3"></div>
        )}
        
        {/* All sections in order */}
        {sectionOrder.map(renderNavSection)}
      </div>
      
      <div className="mt-auto p-2 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-center py-1.5 px-2 text-xs font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <div className="flex items-center w-full">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Collapse</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
} 