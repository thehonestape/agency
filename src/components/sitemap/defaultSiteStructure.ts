export const defaultSiteStructure = {
  name: 'Workhorse',
  path: '/',
  children: [
    {
      name: 'Marketing',
      children: [
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Services', path: '/services' }
      ]
    },
    {
      name: 'Application',
      children: [
        { name: 'Onboarding', path: '/onboarding' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Sitemap', path: '/sitemap' }
      ]
    },
    {
      name: 'Projects',
      children: [
        { name: 'Projects Overview', path: '/projects' },
        { name: 'Project Details', path: '/projects/:projectId' },
        { name: 'Project Management', path: '/projects/:projectId/manage' },
        { name: 'Project Collaboration', path: '/projects/:projectId/collaborate' },
        { name: 'Campaigns', path: '/campaigns' }
      ]
    },
    {
      name: 'Brands',
      children: [
        { name: 'Brand Overview', path: '/brands' },
        { name: 'Brand Demo', path: '/brand-demo' },
        { name: 'Workhorse Brand', path: '/brands/workhorse' },
        { name: 'Brand Analytics', path: '/brand-analytics' }
      ]
    },
    {
      name: 'Content & Assets',
      children: [
        { name: 'Assets', path: '/assets' },
        { name: 'Calendar', path: '/calendar' }
      ]
    },
    {
      name: 'Marketing Channels',
      children: [
        { name: 'Social', path: '/social' },
        { name: 'Email', path: '/email' }
      ]
    },
    {
      name: 'Team & Collaboration',
      children: [
        { name: 'Team', path: '/team' },
        { name: 'Conversations', path: '/conversations' }
      ]
    },
    {
      name: 'UI Components',
      children: [
        { name: 'Catalyst Demo', path: '/catalyst-demo' },
        { name: 'Theme Demo', path: '/theme-demo' }
      ]
    },
    {
      name: 'Administration',
      children: [
        { name: 'Settings', path: '/settings' },
        { name: 'Sitemap', path: '/sitemap' }
      ]
    }
  ]
}; 