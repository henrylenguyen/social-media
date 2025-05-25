'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { cn } from 'src/utils' // Đảm bảo đường dẫn này chính xác

// Placeholder cho icons
interface IconProps {
  className?: string
}
const IconDiscovery = ({ className }: IconProps) => (
  <span className={className} role="img" aria-label="Discovery">🧭</span>
)
const IconChat = ({ className }: IconProps) => (
  <span className={className} role="img" aria-label="Chat">💬</span>
)
const IconEvents = ({ className }: IconProps) => (
  <span className={className} role="img" aria-label="Events">🎉</span>
)
const IconLikes = ({ className }: IconProps) => (
  <span className={className} role="img" aria-label="Likes">💖</span>
)
const IconSafety = ({ className }: IconProps) => (
  <span className={className} role="img" aria-label="Safety">🛡️</span>
)
const IconHelp = ({ className }: IconProps) => (
  <span className={className} role="img" aria-label="Help">❓</span>
)

interface NavItem {
  href: string
  icon: React.ComponentType<IconProps>
  label: string
  badge?: string | null
}

const navItems: NavItem[] = [
  { href: '/discovery', icon: IconDiscovery, label: 'Khám phá', badge: null },
  { href: '/chats', icon: IconChat, label: 'Trò chuyện', badge: '5' },
  { href: '/events', icon: IconEvents, label: 'Sự kiện', badge: null },
  {
    href: '/likes',
    icon: IconLikes,
    label: 'Lượt thích & Top Picks',
    badge: null,
  },
]

const footerItems: NavItem[] = [
  { href: '/safety', icon: IconSafety, label: 'Trung tâm An toàn' },
  { href: '/help', icon: IconHelp, label: 'Trung tâm Hỗ trợ' },
]

interface ISidebarProps {
  className?: string
}

const Sidebar: React.FunctionComponent<ISidebarProps> = ({ className }) => {
  const pathname = usePathname()
  // Sửa lại hàm renderNavItem
  const renderNavItem = (item: NavItem, isActive: boolean) => (
    <Link href={item.href} legacyBehavior>
      <a // <-- Thêm thẻ <a> làm con duy nhất
        href={item.href}
        className={cn(
          'flex items-center gap-3 px-6 py-3 my-1 mx-4 rounded-md text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-primary',
          isActive && 'bg-primary-light text-primary font-semibold',
        )}
      >
        <item.icon
          className={cn(
            'text-xl w-6 text-center',
            isActive ? 'text-primary' : 'text-gray-500',
          )}
        />
        <span>{item.label}</span>
        {item.badge && (
          <span className='ml-auto bg-error text-white text-xs font-bold rounded-full px-2 py-0.5'>
            {item.badge}
          </span>
        )}
      </a>
    </Link>
  )
  // Sửa lại hàm renderFooterItem (tương tự)
  const renderFooterItem = (item: NavItem, isActive: boolean) => (
    <Link href={item.href} legacyBehavior>
      <a // <-- Thêm thẻ <a> làm con duy nhất
        href={item.href}
        className={cn(
          'flex items-center gap-3 px-6 py-3 my-1 mx-4 rounded-md text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-primary',
          isActive && 'text-primary',
        )}
      >
        <item.icon
          className={cn(
            'text-xl w-6 text-center text-gray-400',
            isActive && 'text-primary',
          )}
        />
        <span>{item.label}</span>
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
      {/* Logo */}
      <div className='px-6 py-6 text-left'>
        <img
          src='https://placehold.co/150x40/FF6B6B/FFFFFF?text=HearterLink&font=inter'
          alt='Logo Ứng dụng'
          className='max-h-10 w-auto'
        />
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
