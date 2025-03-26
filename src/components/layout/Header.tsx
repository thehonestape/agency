import { Bars3Icon } from '@heroicons/react/24/outline'

interface HeaderProps {
  onOpenSidebar: () => void
}

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-primary px-4 py-4 shadow-sm sm:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="-m-2.5 p-2.5 text-primary-foreground hover:text-primary-foreground/90 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 text-sm font-semibold leading-6 text-primary-foreground">Components</div>
      <a href="#" className="relative">
        <span className="sr-only">Your profile</span>
        <img
          className="h-8 w-8 rounded-full ring-1 ring-border bg-muted"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-success w-2 h-2 ring-1 ring-background" />
      </a>
    </div>
  )
} 