'use client'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { cn } from 'src/utils'

// Placeholder cho icons
const IconSearch = () => <span>🔍</span>
const IconBell = () => <span>🔔</span>

const UserAvatar = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <div className='relative' ref={menuRef}>
      <div
        className='w-9 h-9 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center font-medium text-gray-700'
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0} // Make it focusable
      >
        TV {/* Placeholder */}
      </div>
      {isOpen && (
        <div className='absolute top-full right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2'>
          <div className='px-4 py-2 border-b border-gray-200 mb-2'>
            <span className='font-semibold text-gray-900 block truncate'>
              Tên Người Dùng Dài
            </span>
            <span className='text-xs text-gray-500 block truncate'>
              user.email@example.com
            </span>
          </div>
          <a
            href='#myprofile'
            className='flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary'
          >
            <span className='text-lg w-5 text-center'>👤</span> Hồ sơ của tôi
          </a>
          <a
            href='#premium'
            className='flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary'
          >
            <span className='text-lg w-5 text-center'>⭐</span> Nâng cấp Premium
          </a>
          <a
            href='#settings'
            className='flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary'
          >
            <span className='text-lg w-5 text-center'>⚙️</span> Cài đặt Tài
            khoản
          </a>
          <div className='h-px bg-gray-200 my-2'></div>
          <a
            href='#logout'
            className='flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary'
          >
            <span className='text-lg w-5 text-center'>🚪</span> Đăng xuất
          </a>
        </div>
      )}
    </div>
  )
}

interface IHeaderProps {
  className?: string
  pageTitle?: string // Allow passing title as prop
}

const Header: React.FunctionComponent<IHeaderProps> = ({
  className,
  pageTitle,
}) => {
  const pathname = usePathname()
  // A simple way to get a title from the path - replace with a better solution if needed
  const defaultTitle =
    pathname
      .split('/')
      .pop()
      ?.replace('-', ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Khám phá'
  const title = pageTitle || defaultTitle

  return (
    <header
      className={cn(
        'bg-white border-b border-gray-200 h-16 flex justify-between items-center px-6 sticky top-0 z-40',
        className,
      )}
    >
      <div className='header-left'>
        <span className='text-lg font-semibold text-gray-900'>{title}</span>
      </div>
      <div className='header-right flex items-center gap-5'>
        <button className='text-gray-500 text-2xl p-2 rounded-full hover:bg-gray-100 hover:text-primary relative'>
          <IconSearch />
        </button>
        <button className='text-gray-500 text-2xl p-2 rounded-full hover:bg-gray-100 hover:text-primary relative'>
          <IconBell />
          <span className='absolute top-1 right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center'>
            3
          </span>
        </button>
        <UserAvatar />
      </div>
    </header>
  )
}

export default Header
