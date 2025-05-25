'use client'

import { Header, Sidebar } from '@social-media/molecules'
import * as React from 'react'

interface IAppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FunctionComponent<IAppLayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col ml-64 overflow-hidden'>
        {' '}
        {/* Thêm ml-64 để tránh bị Sidebar che */}
        <Header />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout
