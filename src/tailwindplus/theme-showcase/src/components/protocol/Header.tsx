import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  navigation?: Array<{ name: string; href: string }>;
}

export default function Header({ navigation = [] }: HeaderProps) {
  return (
    <header className="protocol-header py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
              Protocol
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              className="rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 