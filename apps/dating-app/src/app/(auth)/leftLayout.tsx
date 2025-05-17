import { DateIcons } from '@social-media/assets'
import { FloatingIcons } from '@social-media/molecules'
import * as React from 'react'

interface ILeftLayoutProps {}

const LeftLayout: React.FunctionComponent<ILeftLayoutProps> = (props) => {
  const backgroundItems: Array<{
    id: number
    imageUrl: React.ReactNode
    size: 'lg' | 'md' | 'sm'
  }> = [
    {
      id: 1,
      imageUrl: <DateIcons.HeartIcon width={70} height={70} />,
      size: 'md',
    },
    {
      id: 2,
      imageUrl: <DateIcons.ChatBubbleIcon width={60} height={60} />,
      size: 'md',
    },
    {
      id: 3,
      imageUrl: <DateIcons.LocationPinIcon width={55} height={55} />,
      size: 'sm',
    },
    {
      id: 4,
      imageUrl: <DateIcons.DatingMessageIcon width={120} height={120} />,
      size: 'md',
    },
  ]
  return (
    <FloatingIcons
      haveContainer={false}
      position='back'
      items={backgroundItems}
    />
  )
}

export default LeftLayout
