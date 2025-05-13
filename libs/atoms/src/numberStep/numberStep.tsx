import * as React from 'react'

interface INumberStepProps {
  children?: React.ReactNode
  className?: string
}

const NumberStep: React.FunctionComponent<INumberStepProps> = ({
  children,
  className,
}) => {
  return (
    <div className='w-[50px] h-[50px] rounded-full bg-white text-primary flex items-center justify-center text-2xl'>
      1
    </div>
  )
}

export default NumberStep
