import React from 'react';
import Link from 'next/link';

interface FooterProps {
  navigation?: {
    main?: Array<{ name: string; href: string }>;
    social?: Array<{ name: string; href: string }>;
  };
}

export default function Footer({ navigation }: FooterProps) {
  return (
    <footer className="protocol-footer bg-zinc-50 dark:bg-zinc-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Protocol</h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
              A beautiful, responsive design system for your next project.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-zinc-900 dark:text-white">Navigation</h4>
            <ul className="space-y-2">
              {navigation?.main?.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 md:mt-0">
            <h4 className="font-semibold mb-4 text-zinc-900 dark:text-white">Social</h4>
            <div className="flex space-x-4">
              {navigation?.social?.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 