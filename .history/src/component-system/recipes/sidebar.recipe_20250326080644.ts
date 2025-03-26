/**
 * Sidebar component recipe
 * Defines the base styles, variants, and default variants for the Sidebar component.
 */

export interface SidebarRecipe {
  base: {
    root: string
    content: string
    header: string
    nav: string
    section: string
    sectionTitle: string
    list: string
    item: string
    itemLink: string
    footer: string
  }
  variants: {
    variant: {
      default: string
      primary: string
      minimal: string
    }
    size: {
      default: string
      sm: string
      lg: string
    }
    mobile: {
      default: string
      overlay: string
      push: string
    }
  }
  defaultVariants: {
    variant: 'default'
    size: 'default'
    mobile: 'overlay'
  }
}

export const sidebarRecipe: SidebarRecipe = {
  base: {
    root: "fixed inset-y-0 left-0 z-50 flex",
    content: "flex h-full flex-col bg-card",
    header: "flex h-16 items-center px-6",
    nav: "flex-1 overflow-y-auto",
    section: "flex flex-col gap-y-7",
    sectionTitle: "text-xs font-semibold text-muted-foreground mb-2",
    list: "space-y-1",
    item: "group flex gap-x-3 rounded-md p-2 text-sm font-semibold",
    itemLink: "flex-1 truncate",
    footer: "mt-auto p-6"
  },
  variants: {
    variant: {
      default: "border-r border-border",
      primary: "bg-primary text-primary-foreground",
      minimal: "bg-background"
    },
    size: {
      default: "w-72",
      sm: "w-64",
      lg: "w-80"
    },
    mobile: {
      default: "lg:translate-x-0 -translate-x-full transition-transform duration-200",
      overlay: "lg:hidden translate-x-0",
      push: "lg:translate-x-0 translate-x-0"
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    mobile: 'overlay'
  }
} 