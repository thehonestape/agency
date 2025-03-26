import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface NavigationItem {
  name: string
  href: string
  current: boolean
}

interface Team {
  id: number
  name: string
  href: string
  initial: string
  current: boolean
}

interface SidebarProps {
  navigation: NavigationItem[]
  components: NavigationItem[]
  teams: Team[]
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function NavigationList({ items }: { items: NavigationItem[] }) {
  return (
    <ul role="list" className="-mx-2 space-y-1">
      {items.map((item) => (
        <li key={item.name}>
          <a
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-primary-foreground/10 text-primary-foreground'
                : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
            )}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  )
}

function TeamsList({ teams }: { teams: Team[] }) {
  return (
    <ul role="list" className="-mx-2 space-y-1">
      {teams.map((team) => (
        <li key={team.name}>
          <a
            href={team.href}
            className={classNames(
              team.current
                ? 'bg-primary-foreground/10 text-primary-foreground'
                : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground',
              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
            )}
          >
            <span
              className={classNames(
                team.current
                  ? 'border-primary-foreground text-primary-foreground'
                  : 'border-primary-foreground/20 text-primary-foreground/80 group-hover:border-primary-foreground/60 group-hover:text-primary-foreground',
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-primary-foreground/10'
              )}
            >
              {team.initial}
            </span>
            <span className="truncate">{team.name}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function SidebarContent({ navigation, components, teams }: SidebarProps) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="/workhorse.png"
          alt="Workhorse"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <NavigationList items={navigation} />
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-primary-foreground/80 mb-2">Components</div>
            <NavigationList items={components} />
          </li>
          <li className="mt-auto">
            <div className="text-xs font-semibold leading-6 text-primary-foreground/80 mb-2">Your teams</div>
            <TeamsList teams={teams} />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export function Sidebar({ navigation, components, teams, isMobile, isOpen, onClose }: SidebarProps) {
  if (isMobile) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-primary/10" />
        <div className="fixed inset-0 flex">
          <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button type="button" onClick={onClose} className="-m-2.5 p-2.5">
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-foreground" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent navigation={navigation} components={components} teams={teams} />
          </Dialog.Panel>
        </div>
      </Dialog>
    )
  }

  return (
    <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <SidebarContent navigation={navigation} components={components} teams={teams} />
    </div>
  )
} 