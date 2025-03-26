import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { SitemapGenerator } from '../components/sitemap/SitemapGenerator';
import { BrandHeading } from '../components/brand/BrandHeading';
import { BrandText } from '../components/brand/BrandText';
import { BrandContainer } from '../components/brand/BrandContainer';
import { BrandStyledButton } from '../components/brand/BrandStyledButton';
import { FiEdit2 } from 'react-icons/fi';

export function SitemapPage() {
  return (
    <DashboardLayout>
      <BrandContainer>
        <div className="flex justify-between items-center mb-6">
          <div>
            <BrandHeading level={1}>Sitemap Overview</BrandHeading>
            <BrandText color="muted">
              Visual representation of your site's structure
            </BrandText>
          </div>
          <Link to="/sitemap/editor">
            <BrandStyledButton>
              <FiEdit2 className="mr-2" />
              Interactive Editor
            </BrandStyledButton>
          </Link>
        </div>
        <SitemapGenerator />
      </BrandContainer>
    </DashboardLayout>
  );
}

export default SitemapPage; 