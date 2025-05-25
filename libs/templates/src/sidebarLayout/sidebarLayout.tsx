'use client'
import { Sidebar } from '@social-media/molecules'
import * as React from 'react'
import { cn } from '../utils'

interface SidebarLayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * Layout component with fixed sidebar
 * Ensures content doesn't overlap with the sidebar
 */
const SidebarLayout: React.FunctionComponent<SidebarLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className='h-screen flex bg-gray-50'>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main
        className={cn(
          'flex-1 ml-64 overflow-auto', // ml-64 = 16rem = 256px (sidebar width)
          'bg-white min-h-screen',
          className,
        )}
      >
        <div className='p-6'>{children}</div>
      </main>
    </div>
  )
}

export default SidebarLayout
