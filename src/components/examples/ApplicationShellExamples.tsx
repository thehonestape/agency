'use client'

import React, { useState } from 'react'
import { DarkNavWithWhitePageHeader, LightNavWithBottomBorder, LightNavOnGrayBackground, SimpleStackedWithPageHeader, StackedWithBreadcrumbs, StackedWithShadowedCards, StackedWithTabs } from '../application-shells/stacked'
import { BrandSidebarWithHeader, DarkSidebarWithHeader, LightSidebarWithHeader } from '../application-shells/sidebar'
import { FullWidthSecondaryColumnOnRight } from '../application-shells/multi-column'

type LayoutGroup = 'stacked' | 'sidebar' | 'multi-column'

type StackedLayout = 
  | 'DarkNavWithWhitePageHeader' 
  | 'LightNavWithBottomBorder' 
  | 'LightNavOnGrayBackground'
  | 'SimpleStackedWithPageHeader'
  | 'StackedWithBreadcrumbs'
  | 'StackedWithShadowedCards'
  | 'StackedWithTabs'

type SidebarLayout = 
  | 'BrandSidebarWithHeader' 
  | 'DarkSidebarWithHeader' 
  | 'LightSidebarWithHeader'

type MultiColumnLayout = 
  | 'FullWidthSecondaryColumnOnRight'

export default function ApplicationShellExamples() {
  const [activeGroup, setActiveGroup] = useState<LayoutGroup>('stacked')
  const [activeStackedLayout, setActiveStackedLayout] = useState<StackedLayout>('DarkNavWithWhitePageHeader')
  const [activeSidebarLayout, setActiveSidebarLayout] = useState<SidebarLayout>('BrandSidebarWithHeader')
  const [activeMultiColumnLayout, setActiveMultiColumnLayout] = useState<MultiColumnLayout>('FullWidthSecondaryColumnOnRight')

  // Helper function to render example content (cards)
  const renderExampleContent = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Card {i + 1}</h3>
            <p className="mt-2 text-sm text-gray-500">
              This is an example card for demonstration purposes.
            </p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveGroup('stacked')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeGroup === 'stacked' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Stacked Layouts
        </button>
        <button
          onClick={() => setActiveGroup('sidebar')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeGroup === 'sidebar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Sidebar Layouts
        </button>
        <button
          onClick={() => setActiveGroup('multi-column')}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            activeGroup === 'multi-column' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Multi-column Layouts
        </button>
      </div>

      {activeGroup === 'stacked' && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveStackedLayout('DarkNavWithWhitePageHeader')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeStackedLayout === 'DarkNavWithWhitePageHeader' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Dark Nav With White Page Header
          </button>
          <button
            onClick={() => setActiveStackedLayout('LightNavWithBottomBorder')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeStackedLayout === 'LightNavWithBottomBorder' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Light Nav With Bottom Border
          </button>
          <button
            onClick={() => setActiveStackedLayout('LightNavOnGrayBackground')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeStackedLayout === 'LightNavOnGrayBackground' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Light Nav On Gray Background
          </button>
          <button
            onClick={() => setActiveStackedLayout('SimpleStackedWithPageHeader')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeStackedLayout === 'SimpleStackedWithPageHeader' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Simple Stacked With Page Header
          </button>
          <button
            onClick={() => setActiveStackedLayout('StackedWithBreadcrumbs')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeStackedLayout === 'StackedWithBreadcrumbs' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Stacked With Breadcrumbs
          </button>
          <button
            onClick={() => setActiveStackedLayout('StackedWithShadowedCards')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeStackedLayout === 'StackedWithShadowedCards' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Stacked With Shadowed Cards
          </button>
          <button
            onClick={() => setActiveStackedLayout('StackedWithTabs')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeStackedLayout === 'StackedWithTabs' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Stacked With Tabs
          </button>
        </div>
      )}

      {activeGroup === 'sidebar' && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSidebarLayout('BrandSidebarWithHeader')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSidebarLayout === 'BrandSidebarWithHeader' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Brand Sidebar With Header
          </button>
          <button
            onClick={() => setActiveSidebarLayout('DarkSidebarWithHeader')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSidebarLayout === 'DarkSidebarWithHeader' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Dark Sidebar With Header
          </button>
          <button
            onClick={() => setActiveSidebarLayout('LightSidebarWithHeader')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeSidebarLayout === 'LightSidebarWithHeader' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Light Sidebar With Header
          </button>
        </div>
      )}

      {activeGroup === 'multi-column' && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMultiColumnLayout('FullWidthSecondaryColumnOnRight')}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              activeMultiColumnLayout === 'FullWidthSecondaryColumnOnRight' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Full Width Secondary Column On Right
          </button>
        </div>
      )}

      <div className="border border-gray-300 rounded-md">
        {activeGroup === 'stacked' && (
          <>
            {activeStackedLayout === 'DarkNavWithWhitePageHeader' && <DarkNavWithWhitePageHeader />}
            {activeStackedLayout === 'LightNavWithBottomBorder' && <LightNavWithBottomBorder />}
            {activeStackedLayout === 'LightNavOnGrayBackground' && <LightNavOnGrayBackground />}
            {activeStackedLayout === 'SimpleStackedWithPageHeader' && <SimpleStackedWithPageHeader />}
            {activeStackedLayout === 'StackedWithBreadcrumbs' && <StackedWithBreadcrumbs />}
            {activeStackedLayout === 'StackedWithShadowedCards' && <StackedWithShadowedCards />}
            {activeStackedLayout === 'StackedWithTabs' && <StackedWithTabs />}
          </>
        )}

        {activeGroup === 'sidebar' && (
          <>
            {activeSidebarLayout === 'BrandSidebarWithHeader' && <BrandSidebarWithHeader />}
            {activeSidebarLayout === 'DarkSidebarWithHeader' && <DarkSidebarWithHeader />}
            {activeSidebarLayout === 'LightSidebarWithHeader' && <LightSidebarWithHeader />}
          </>
        )}

        {activeGroup === 'multi-column' && (
          <>
            {activeMultiColumnLayout === 'FullWidthSecondaryColumnOnRight' && (
              <FullWidthSecondaryColumnOnRight />
            )}
          </>
        )}
      </div>
    </div>
  )
} 