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

// Define the type for navigation items
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
  initial?: string;
  children?: NavItem[];
}

interface NavSection {
  title: string;
  items: NavItem[];
}

// SideNav props interface
interface SideNavProps {
  collapsed: boolean;
  onToggle: () => void;
  navigation?: NavItem[];
  sections?: NavSection[];
}

export function SideNav({ collapsed, onToggle, navigation = [], sections = [] }: SideNavProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
    
    return (
      <Link
        key={item.name}
        to={item.href}
        className={cn(
          "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
          isActive
            ? "bg-gray-50 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400"
            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-800"
        )}
      >
        <item.icon
          className={cn(
            isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
            "h-6 w-6 shrink-0"
          )}
          aria-hidden="true"
        />
        {!collapsed && (
          <>
            <span className="truncate">{item.name}</span>
            {item.count && (
              <span className="ml-auto bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs font-medium">
                {item.count}
              </span>
            )}
            {item.initial && (
              <span className="ml-auto bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs font-medium">
                {item.initial}
              </span>
            )}
          </>
        )}
      </Link>
    );
  };

  const renderNavSection = (section: NavSection) => {
    return (
      <div key={section.title} className={cn(
        "mb-2",
        collapsed ? "px-1.5" : "px-3"
      )}>
        {!collapsed && (
          <h3 className="mb-1 ml-2 text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
            {section.title}
          </h3>
        )}
        
        <div className="space-y-0.5">
          {section.items.map(renderNavItem)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      <div className="flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-800 px-4">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      
      <nav className="flex flex-1 flex-col overflow-y-auto py-4">
        <div className="space-y-4">
          {/* Primary Navigation */}
          {navigation.length > 0 && (
            <div className={cn(
              "mb-2",
              collapsed ? "px-1.5" : "px-3"
            )}>
              <div className="space-y-0.5">
                {navigation.map(renderNavItem)}
              </div>
            </div>
          )}

          {/* Secondary Navigation Sections */}
          {sections.map(renderNavSection)}
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="flex h-16 shrink-0 items-center border-t border-gray-200 dark:border-gray-800 px-4">
        <button
          onClick={onToggle}
          className="flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-800"
        >
          {collapsed ? (
            <ChevronRight className="h-6 w-6 shrink-0" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-6 w-6 shrink-0" aria-hidden="true" />
          )}
          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </div>
    </div>
  );
} 