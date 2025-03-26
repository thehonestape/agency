import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '../../../lib/utils'
import { sidebarRecipe } from '../../../component-system/recipes/sidebar.recipe'
import { BaseComponentProps } from '../../../lib/composition/types'
import { componentRegistry } from '../../../lib/discovery/ComponentRegistry'

// Create variants using the recipe
const sidebarVariants = cva('', {
  variants: {
    variant: {
      default: sidebarRecipe.variants.variant.default,
      primary: sidebarRecipe.variants.variant.primary,
      minimal: sidebarRecipe.variants.variant.minimal,
    },
    size: {
      default: sidebarRecipe.variants.size.default,
      sm: sidebarRecipe.variants.size.sm,
      lg: sidebarRecipe.variants.size.lg,
    },
    mobile: {
      default: sidebarRecipe.variants.mobile.default,
      overlay: sidebarRecipe.variants.mobile.overlay,
      push: sidebarRecipe.variants.mobile.push,
    },
  },
  defaultVariants: sidebarRecipe.defaultVariants,
})

// Create item variants
const itemVariants = cva(sidebarRecipe.base.item, {
  variants: {
    state: sidebarRecipe.variants.itemState,
    type: sidebarRecipe.variants.itemType,
  },
  defaultVariants: {
    state: 'default',
    type: 'default',
  },
})

// Omit size from BaseComponentProps to avoid conflict
type SidebarBaseProps = Omit<BaseComponentProps, 'size'>

// Props interface
export interface SidebarProps extends SidebarBaseProps, VariantProps<typeof sidebarVariants> {
  navigation?: NavigationItem[]
  sections?: SidebarSection[]
  footer?: React.ReactNode
  isOpen?: boolean
  onClose?: () => void
}

interface NavigationItem {
  name: string
  href: string
  current?: boolean
  icon?: React.ComponentType<{ className?: string }>
  count?: string
  initial?: string
}

interface SidebarSection {
  title: string
  items: NavigationItem[]
}

// Navigation Item Component
function NavigationItem({ item }: { item: NavigationItem }) {
  return (
    <li>
      <a
        href={item.href}
        className={itemVariants({
          state: item.current ? 'active' : 'default',
          type: item.count ? 'withCount' : item.initial ? 'withInitial' : 'default',
        })}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.icon ? (
          <item.icon className={sidebarRecipe.base.itemIcon} aria-hidden="true" />
        ) : item.initial ? (
          <span className={sidebarRecipe.base.itemInitial}>
            {item.initial}
          </span>
        ) : null}
        <span className={sidebarRecipe.base.itemLabel}>{item.name}</span>
        {item.count && (
          <span className={sidebarRecipe.base.itemCount} aria-hidden="true">
            {item.count}
          </span>
        )}
      </a>
    </li>
  )
}

// Navigation List Component
function NavigationList({ items }: { items: NavigationItem[] }) {
  return (
    <ul role="list" className={sidebarRecipe.base.list}>
      {items.map((item) => (
        <NavigationItem key={item.name} item={item} />
      ))}
    </ul>
  )
}

// Sidebar Content Component
function SidebarContent({ navigation, sections, footer }: SidebarProps) {
  return (
    <div className={sidebarRecipe.base.content}>
      <div className={sidebarRecipe.base.header}>
        <img
          className="h-8 w-auto"
          src="/workhorse.png"
          alt="Workhorse"
        />
      </div>
      <nav className={sidebarRecipe.base.nav} aria-label="Sidebar navigation">
        <div className={sidebarRecipe.base.section}>
          {navigation && (
            <NavigationList items={navigation} />
          )}
          {sections?.map((section) => (
            <div key={section.title}>
              <div className={sidebarRecipe.base.sectionTitle}>{section.title}</div>
              <NavigationList items={section.items} />
            </div>
          ))}
        </div>
      </nav>
      {footer && (
        <div className={sidebarRecipe.base.footer}>
          {footer}
        </div>
      )}
    </div>
  )
}

// Main Sidebar Component
export function Sidebar({ 
  navigation, 
  sections, 
  footer,
  variant,
  size,
  mobile,
  isOpen,
  onClose,
  className,
  ...props 
}: SidebarProps) {
  // Handle Dialog close
  const handleClose = (value: boolean) => {
    if (!value) {
      onClose?.()
    }
  }

  // Mobile sidebar with Dialog
  if (mobile === 'overlay' && isOpen !== undefined) {
    return (
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true" />
        <Dialog.Panel className={cn(
          sidebarRecipe.base.root,
          sidebarVariants({ variant, size, mobile }),
          className
        )}>
          <button 
            type="button" 
            onClick={() => handleClose(false)} 
            className="absolute right-4 top-4 p-2.5 text-muted-foreground hover:text-foreground"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <SidebarContent 
            navigation={navigation} 
            sections={sections} 
            footer={footer} 
          />
        </Dialog.Panel>
      </Dialog>
    )
  }

  // Desktop sidebar
  return (
    <div 
      className={cn(
        sidebarRecipe.base.root,
        sidebarVariants({ variant, size, mobile }),
        className
      )}
      {...props}
    >
      <SidebarContent 
        navigation={navigation} 
        sections={sections} 
        footer={footer} 
      />
    </div>
  )
}

// Register component
componentRegistry.register('patterns.navigation.sidebar', {
  id: 'patterns.navigation.sidebar',
  component: Sidebar,
  descriptor: {
    type: 'pattern',
    name: 'Sidebar',
    tag: 'nav',
    props: {
      variant: 'default',
      size: 'default',
      mobile: 'overlay'
    },
  },
  metadata: {
    name: 'Sidebar',
    description: 'Navigation sidebar component with support for sections, counts, initials, and mobile responsiveness',
    category: 'patterns.navigation',
    tags: ['navigation', 'sidebar', 'layout', 'pattern'],
    created: new Date().toISOString(),
    author: 'Component System',
    version: '1.0.0',
  },
}) 