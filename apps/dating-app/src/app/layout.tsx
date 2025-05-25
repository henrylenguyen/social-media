import '@social-media/styles'
import * as React from 'react'
import AppLayoutClient from './appLayoutClient'

export const metadata = {
  title: 'Welcome to HearterLink',
  description: 'Find your connection with HearterLink.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='vi'>
      <body className='bg-background'>
        <AppLayoutClient>{children}</AppLayoutClient>
      </body>
    </html>
  )
}
