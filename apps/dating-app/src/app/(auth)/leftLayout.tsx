import {
  ChatBubbleIcon,
  DatingMessageIcon,
  HeartIcon,
  LocationPinIcon,
} from '@social-media/assets'
import { FloatingIcons } from '@social-media/molecules'
import * as React from 'react'

interface ILeftLayoutProps {
  isCustomLayout?: boolean
}
const LeftLayout: React.FC<ILeftLayoutProps> = ({ isCustomLayout }) => {
  // Các biểu tượng nổi cho các trang đăng nhập/đăng ký
  const backgroundItems: Array<{
    id: number
    imageUrl: React.ReactNode
    size: 'lg' | 'md' | 'sm'
  }> = [
    {
      id: 1,
      imageUrl: <HeartIcon width={70} height={70} />,
      size: 'md',
    },
    {
      id: 2,
      imageUrl: <ChatBubbleIcon width={60} height={60} />,
      size: 'md',
    },
    {
      id: 3,
      imageUrl: <LocationPinIcon width={55} height={55} />,
      size: 'sm',
    },
    {
      id: 4,
      imageUrl: <DatingMessageIcon width={120} height={120} />,
      size: 'md',
    },
  ]

  return (
    <>
      <FloatingIcons
        haveContainer={false}
        position='back'
        items={backgroundItems}
      />
    </>
  )
}

export default LeftLayout
