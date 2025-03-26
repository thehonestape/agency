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
    itemIcon: string
    itemLabel: string
    itemCount: string
    itemInitial: string
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
    itemState: {
      default: string
      active: string
      hover: string
    }
    itemType: {
      default: string
      withCount: string
      withInitial: string
    }
  }
  defaultVariants: {
    variant: 'default'
    size: 'default'
    mobile: 'overlay'
    itemState: 'default'
    itemType: 'default'
  }
  data: {
    root: string
    content: string
    header: string
    nav: string
    section: string
    sectionTitle: string
    list: string
    item: string
    itemLink: string
    itemIcon: string
    itemLabel: string
    itemCount: string
    itemInitial: string
    footer: string
    brand: string
    backdrop: string
    close: string
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
    itemIcon: "h-5 w-5 shrink-0",
    itemLabel: "truncate",
    itemCount: "ml-auto w-9 min-w-max rounded-full bg-background px-2.5 py-0.5 text-center text-xs font-medium ring-1 ring-border",
    itemInitial: "flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border bg-background text-[0.625rem] font-medium",
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
    },
    itemState: {
      default: "text-muted-foreground hover:bg-muted hover:text-foreground",
      active: "bg-primary/10 text-primary",
      hover: "hover:bg-muted hover:text-foreground"
    },
    itemType: {
      default: "",
      withCount: "justify-between",
      withInitial: "items-center"
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    mobile: 'overlay',
    itemState: 'default',
    itemType: 'default'
  },
  data: {
    root: "sidebar",
    content: "sidebar-content",
    header: "sidebar-header",
    nav: "sidebar-nav",
    section: "sidebar-section",
    sectionTitle: "sidebar-section-title",
    list: "nav-list",
    item: "nav-item",
    itemLink: "nav-item-link",
    itemIcon: "nav-item-icon",
    itemLabel: "nav-item-label",
    itemCount: "nav-item-count",
    itemInitial: "nav-item-initial",
    footer: "sidebar-footer",
    brand: "sidebar-brand",
    backdrop: "sidebar-backdrop",
    close: "sidebar-close"
  }
} 