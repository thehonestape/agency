import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

import { MainNav } from '@/components/navigation/MainNav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add scroll effect to make header more prominent when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-200 backdrop-blur-sm ${
      scrolled ? 'bg-background/80 shadow-sm' : 'bg-background/70'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-foreground">
              Workhorse
            </Link>
          </div>

          <nav className="mx-6 hidden md:flex md:flex-1 items-center justify-center gap-1">
            <MainNav className="mx-6" currentPath={location.pathname} />
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden md:flex">
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 max-w-none space-y-4 bg-background">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`px-2 py-1 rounded-md hover:bg-muted ${
                location.pathname === '/' ? 'font-medium text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/ui-blocks"
              className={`px-2 py-1 rounded-md hover:bg-muted ${
                location.pathname.includes('/ui-blocks') ? 'font-medium text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              UI Blocks
            </Link>
            <Link
              to="/ui-blocks/demo"
              className={`px-2 py-1 rounded-md hover:bg-muted ${
                location.pathname === '/ui-blocks/demo' ? 'font-medium text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </Link>
            <Link
              to="/contact"
              className={`px-2 py-1 rounded-md hover:bg-muted ${
                location.pathname === '/contact' ? 'font-medium text-primary' : 'text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          <div className="pt-2 border-t">
            <Button className="w-full" size="sm">
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 