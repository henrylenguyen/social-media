'use client'
import { LogoIcon } from '@social-media/assets'
import {
  Calendar,
  Compass,
  Heart,
  HelpCircle,
  MessageCircle,
  Shield,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { cn } from 'src/utils'

// Icon components with consistent sizing and better design
interface IconProps {
  className?: string
}
const IconDiscovery = ({ className }: IconProps) => (
  <Compass className={className} />
)
const IconChat = ({ className }: IconProps) => (
  <MessageCircle className={className} />
)
const IconEvents = ({ className }: IconProps) => (
  <Calendar className={className} />
)
const IconLikes = ({ className }: IconProps) => <Heart className={className} />
const IconSafety = ({ className }: IconProps) => (
  <Shield className={className} />
)
const IconHelp = ({ className }: IconProps) => (
  <HelpCircle className={className} />
)

interface NavItem {
  href: string
  icon: React.ComponentType<IconProps>
  label: string
  badge?: string | null
  color?: string
}

const navItems: NavItem[] = [
  {
    href: '/discovery',
    icon: IconDiscovery,
    label: 'Khám phá',
    badge: null,
    color: 'text-blue-500',
  },
  {
    href: '/chats',
    icon: IconChat,
    label: 'Trò chuyện',
    badge: '5',
    color: 'text-green-500',
  },
  {
    href: '/events',
    icon: IconEvents,
    label: 'Sự kiện',
    badge: null,
    color: 'text-purple-500',
  },
  {
    href: '/likes',
    icon: IconLikes,
    label: 'Lượt thích & Top Picks',
    badge: null,
    color: 'text-red-500',
  },
]

const footerItems: NavItem[] = [
  {
    href: '/safety',
    icon: IconSafety,
    label: 'Trung tâm An toàn',
    color: 'text-orange-500',
  },
  {
    href: '/help',
    icon: IconHelp,
    label: 'Trung tâm Hỗ trợ',
    color: 'text-indigo-500',
  },
]

interface ISidebarProps {
  className?: string
}

const Sidebar: React.FunctionComponent<ISidebarProps> = ({ className }) => {
  const pathname = usePathname()

  // Enhanced renderNavItem với thiết kế đẹp hơn
  const renderNavItem = (item: NavItem, isActive: boolean) => (
    <Link href={item.href} legacyBehavior>
      <a
        href={item.href}
        className={cn(
          'group flex items-center gap-3 px-4 py-3 my-1 mx-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out',
          'hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary-light/10',
          'hover:shadow-sm',
          isActive
            ? 'bg-gradient-to-r from-primary/15 to-primary-light/15 text-primary shadow-sm border-l-4 border-primary'
            : 'text-gray-700 hover:text-primary',
        )}
      >
        <item.icon
          className={cn(
            'w-5 h-5 transition-all duration-200',
            isActive
              ? 'text-primary drop-shadow-sm'
              : item.color || 'text-gray-500',
            'group-hover:text-primary',
          )}
        />
        <span
          className={cn(
            'flex-1 transition-all duration-200',
            isActive ? 'font-semibold' : 'group-hover:font-medium',
          )}
        >
          {item.label}
        </span>
        {item.badge && (
          <span
            className={cn(
              'px-2 py-1 text-xs font-bold rounded-full transition-all duration-200',
              'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm',
            )}
          >
            {item.badge}
          </span>
        )}
      </a>
    </Link>
  )

  // Enhanced renderFooterItem với thiết kế đẹp hơn
  const renderFooterItem = (item: NavItem, isActive: boolean) => (
    <Link href={item.href} legacyBehavior>
      <a
        href={item.href}
        className={cn(
          'group flex items-center gap-3 px-4 py-2 my-1 mx-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out',
          'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100',
          'hover:shadow-sm',
          isActive
            ? 'bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary shadow-sm'
            : 'text-gray-600 hover:text-primary',
        )}
      >
        <item.icon
          className={cn(
            'w-5 h-5 transition-all duration-200',
            isActive
              ? 'text-primary drop-shadow-sm'
              : item.color || 'text-gray-400',
            'group-hover:text-primary',
          )}
        />
        <span
          className={cn(
            'transition-all duration-200',
            isActive ? 'font-medium' : 'group-hover:font-medium',
          )}
        >
          {item.label}
        </span>
      </a>
    </Link>
  )

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col',
        className,
      )}
    >
      <div className='px-6 py-6 text-left'>
        <LogoIcon />
      </div>
      {/* Navigation */}
      <nav className='flex-grow overflow-y-auto'>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              {renderNavItem(item, pathname === item.href)}
            </li>
          ))}
        </ul>
      </nav>
      {/* Footer Navigation */}
      <div className='py-4 mx-4 border-t border-gray-200'>
        <nav>
          <ul>
            {footerItems.map((item) => (
              <li key={item.href}>
                {renderFooterItem(item, pathname === item.href)}{' '}
                {/* <-- Sử dụng hàm renderFooterItem */}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
