import React from 'react'

interface SVGIconProps {
  className?: string
  width?: number
  height?: number
}

const ChatBubbleIcon: React.FC<SVGIconProps> = ({
  className,
  width = 50,
  height = 50,
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 100 100'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <defs>
      <linearGradient id='chatGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style={{ stopColor: '#2E86DE', stopOpacity: 0.9 }} />
        <stop
          offset='100%'
          style={{ stopColor: '#54A0FF', stopOpacity: 0.9 }}
        />
      </linearGradient>
    </defs>
    <path
      d='M20,20 L80,20 C85,20 90,25 90,30 L90,60 C90,65 85,70 80,70 L60,70 L50,85 L40,70 L20,70 C15,70 10,65 10,60 L10,30 C10,25 15,20 20,20 Z'
      fill='url(#chatGradient)'
    />
  </svg>
)

export default ChatBubbleIcon
