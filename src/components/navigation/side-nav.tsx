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
  FiMinimize2 as Minimize2,
  FiTag as Tag
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
        data-nav-item
        data-nav-item-active={isActive}
        className={cn(
          "group flex items-center gap-x-3 rounded-md px-2 py-1.5 text-sm font-medium",
          isActive
            ? "bg-nav-bg-active text-nav-text-active"
            : "text-nav-text hover:text-nav-text-hover hover:bg-nav-bg-hover"
        )}
      >
        <item.icon
          data-nav-item-icon
          className={cn(
            isActive 
              ? "text-nav-icon-active" 
              : "text-nav-icon group-hover:text-nav-icon-hover",
            "h-5 w-5 shrink-0"
          )}
          aria-hidden="true"
        />
        {!collapsed && (
          <>
            <span data-nav-item-label className="flex-1 truncate">{item.name}</span>
            {item.count && (
              <span data-nav-item-count className="ml-auto text-nav-count text-sm tabular-nums">
                {item.count}
              </span>
            )}
            {item.initial && (
              <span data-nav-item-initial className="ml-auto text-nav-count text-sm">
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
      <div key={section.title} data-nav-section>
        {!collapsed && (
          <h3 data-nav-section-title className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-nav-section-text">
            {section.title}
          </h3>
        )}
        <div data-nav-section-items className="space-y-1 px-2">
          {section.items.map(renderNavItem)}
        </div>
      </div>
    );
  };

  return (
    <div data-nav-root className="flex h-full flex-col bg-nav-bg">
      <div data-nav-header className="flex h-14 shrink-0 items-center px-3">
        <span className="text-lg font-semibold text-nav-text">UI Kit</span>
      </div>
      
      <nav data-nav-content className="flex flex-1 flex-col overflow-y-auto">
        <div data-nav-sections className="flex-1 space-y-6 py-4">
          {/* Primary Navigation */}
          {navigation.length > 0 && (
            <div data-nav-primary>
              <div data-nav-primary-items className="space-y-1 px-2">
                {navigation.map(renderNavItem)}
              </div>
            </div>
          )}

          {/* Secondary Navigation Sections */}
          {sections.map(renderNavSection)}
        </div>
      </nav>

      {/* Collapse Button */}
      <div data-nav-footer className="flex h-14 shrink-0 items-center px-2">
        <button
          data-nav-toggle
          onClick={onToggle}
          className="flex w-full items-center gap-x-3 rounded-md px-2 py-1.5 text-sm font-medium text-nav-text hover:text-nav-text-hover hover:bg-nav-bg-hover"
        >
          {collapsed ? (
            <Plus data-nav-toggle-icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          ) : (
            <Plus data-nav-toggle-icon className="h-5 w-5 shrink-0" aria-hidden="true" />
          )}
          {!collapsed && <span data-nav-toggle-label>New Project</span>}
        </button>
      </div>
    </div>
  );
} 