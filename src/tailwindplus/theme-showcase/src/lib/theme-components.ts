import { ThemeName } from './theme-provider';
import dynamic from 'next/dynamic';
import React from 'react';

// Define component types that we want to showcase
export type ComponentType = 'Button' | 'Header' | 'Hero' | 'Card' | 'Footer';

// Create fallback components
const FallbackButton = dynamic(() => import('../components/fallbacks/Button'));
const FallbackHeader = dynamic(() => import('../components/fallbacks/Header'));
const FallbackHero = dynamic(() => import('../components/fallbacks/Hero'));
const FallbackCard = dynamic(() => import('../components/fallbacks/Card'));
const FallbackFooter = dynamic(() => import('../components/fallbacks/Footer'));

// Protocol components - using wrapper components
const ProtocolButton = dynamic(() => import('../components/protocol/Button'));
const ProtocolHeader = dynamic(() => import('../components/protocol/Header'));
const ProtocolHero = dynamic(() => import('../components/protocol/Hero'));
const ProtocolCard = dynamic(() => import('../components/protocol/Card'));
const ProtocolFooter = dynamic(() => import('../components/protocol/Footer'));

// Create a mapping of theme components
export const themeComponents: Record<ThemeName, Record<ComponentType, React.ComponentType<any>>> = {
  protocol: {
    Button: ProtocolButton,
    Header: ProtocolHeader,
    Hero: ProtocolHero,
    Card: ProtocolCard,
    Footer: ProtocolFooter,
  },
  salient: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
  studio: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
  radiant: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
  commit: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
  keynote: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
  pocket: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
  primer: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
  transmit: {
    Button: FallbackButton,
    Header: FallbackHeader,
    Hero: FallbackHero,
    Card: FallbackCard,
    Footer: FallbackFooter,
  },
};

// Helper function to get a component by theme and type
export function getThemeComponent(theme: ThemeName, componentType: ComponentType) {
  return themeComponents[theme][componentType];
}

// Component props for each component type
export const componentProps: Record<ComponentType, any> = {
  Button: { 
    children: 'Click Me', 
    onClick: () => console.log('Button clicked'),
    className: 'font-medium',
    variant: 'primary',
  },
  Header: { 
    navigation: [
      { name: 'Home', href: '#' },
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'About', href: '#' },
    ],
  },
  Hero: { 
    title: 'Welcome to Our Platform',
    description: 'A beautiful, responsive design system for your next project.',
  },
  Card: { 
    title: 'Card Component',
    description: 'This is a versatile card component that can be used for various purposes.',
    children: 'Additional content can be placed here.',
  },
  Footer: {
    navigation: {
      main: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
      ],
      social: [
        { name: 'Twitter', href: '#' },
        { name: 'Facebook', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'GitHub', href: '#' },
      ],
    },
  },
}; 