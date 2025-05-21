import * as React from 'react'
import { cn } from 'src/utils'

interface IHeaderProps {
  className?: string
  children?: React.ReactNode
  rightChildren?: React.ReactNode
}

const Header: React.FunctionComponent<IHeaderProps> = ({
  className,
  children,
  rightChildren,
}) => {
  return (
    <header className={cn('bg-white shadow-md h-[80px]', className)}>
      <div
        className={'container mx-auto flex items-start justify-between p-4 h-full'}
      >
        <div className='flex items-center gap-2'>
          <img
            src='https://i.pravatar.cc/150?u=1'
            alt='Logo'
            className='w-10 h-10 rounded-full'
          />
          <h1 className='text-xl font-bold'>HearterLink</h1>
        </div>
        <div className='flex items-center'>{children}</div>
        <div className='flex items-center'>{rightChildren}</div>
      </div>
    </header>
  )
}

export default Header
