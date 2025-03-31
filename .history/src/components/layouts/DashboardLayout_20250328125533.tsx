import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  UserIcon,
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  FolderIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Dashboard Nav Items
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderIcon },
  { name: 'Team', href: '/dashboard/team', icon: UsersIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

// User Navigation Items
const userNavigation = [
  { name: 'Your Profile', href: '/dashboard/profile' },
  { name: 'Settings', href: '/dashboard/settings' },
  { name: 'Sign out', href: '/logout' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="border-border bg-background flex w-64 flex-col border-r">
          <div className="flex h-0 flex-1 flex-col">
            <div className="border-border flex h-16 flex-shrink-0 items-center border-b px-4">
              <Link to="/" className="flex items-center">
                <span className="text-primary text-xl font-bold">Agency</span>
              </Link>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted hover:text-primary'
                      } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                    >
                      <item.icon
                        className={`${
                          isActive
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground group-hover:text-primary'
                        } mr-3 h-6 w-6 flex-shrink-0`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="border-border flex flex-shrink-0 border-t p-4">
              <div className="flex items-center">
                <div>
                  <UserIcon className="text-muted-foreground inline-block h-9 w-9 rounded-full" />
                </div>
                <div className="ml-3">
                  <p className="text-foreground text-sm font-medium">User Name</p>
                  <p className="text-muted-foreground text-xs font-medium">
                    View profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <div className="bg-card relative z-10 flex h-16 flex-shrink-0 shadow">
          <button
            type="button"
            className="border-border text-muted-foreground focus:ring-primary border-r px-4 focus:ring-2 focus:outline-none focus:ring-inset md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <div className="flex w-full md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="text-muted-foreground focus-within:text-primary relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="text-foreground placeholder-muted-foreground focus:placeholder-muted-foreground block h-full w-full border-transparent bg-transparent py-2 pr-3 pl-8 focus:border-transparent focus:ring-0 focus:outline-none sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="text-muted-foreground hover:text-primary focus:ring-primary rounded-full p-1 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="bg-card focus:ring-primary flex max-w-xs items-center rounded-full text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="text-muted-foreground h-8 w-8 rounded-full" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
