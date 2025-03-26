import React from 'react';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { ReactFlowSitemapEditor } from '../components/sitemap/ReactFlowSitemapEditor';

export function SitemapEditorPage() {
  return (
    <DashboardLayout>
      <ReactFlowSitemapEditor />
    </DashboardLayout>
  );
}

export default SitemapEditorPage; 