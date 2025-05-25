'use client'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import AppLayout from './appLayout'

interface IAppLayoutClientProps {
  children: React.ReactNode
}

const AppLayoutClient: React.FunctionComponent<IAppLayoutClientProps> = ({
  children,
}) => {
  const pathname = usePathname()

  // Các đường dẫn không sử dụng layout chính (Sidebar + Header)
  const noLayoutRoutes = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/profile/set-up-first-time', 
  ]

  // Kiểm tra xem đường dẫn hiện tại có bắt đầu bằng một trong các noLayoutRoutes không
  const shouldUseLayout = !noLayoutRoutes.some((route) =>
    pathname.startsWith(route),
  )

  return <>{shouldUseLayout ? <AppLayout>{children}</AppLayout> : children}</>
}

export default AppLayoutClient
