import * as React from 'react'
import { cn } from 'src/utils/cn'

interface ICircleWithImageProps {
  imageUrl: string | React.ReactNode
  className?: string
}
const CircleWithImage: React.FunctionComponent<ICircleWithImageProps> = ({
  className,
  imageUrl,
}) => {
  return (
    <div
      className={cn(
        'w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center text-2xl p-2',
        className,
      )}
    >
      {imageUrl && typeof imageUrl === 'string' ? (
        <img
          loading='lazy'
          src={imageUrl ?? 'https://i.pravatar.cc/150?u=3'}
          alt='stepper'
          width={100}
          height={100}
          className='rounded-full'
        />
      ) : (
        <div>{imageUrl}</div>
      )}
    </div>
  )
}
export default CircleWithImage
