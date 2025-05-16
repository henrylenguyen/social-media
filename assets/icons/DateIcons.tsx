import React from 'react'

interface SVGIconProps {
  className?: string
  width?: number
  height?: number
}

// Transparent Heart Icon
export const HeartIcon: React.FC<SVGIconProps> = ({
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
      <linearGradient id='heartGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style={{ stopColor: '#FF6B6B', stopOpacity: 0.9 }} />
        <stop
          offset='100%'
          style={{ stopColor: '#FF9E80', stopOpacity: 0.9 }}
        />
      </linearGradient>
    </defs>
    <path
      d='M50 90C47.5 87.5 15 60 15 35C15 22.4 25.4 12 38 12C44.5 12 50.3 14.9 54 19.3C57.7 14.9 63.5 12 70 12C82.6 12 93 22.4 93 35C93 60 50.5 87.5 50 90Z'
      fill='url(#heartGradient)'
    />
  </svg>
)

// Transparent Chat Bubble Icon
export const ChatBubbleIcon: React.FC<SVGIconProps> = ({
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

// Transparent Location Pin Icon
export const LocationPinIcon: React.FC<SVGIconProps> = ({
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
      <linearGradient id='locationGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style={{ stopColor: '#FF6B6B', stopOpacity: 0.9 }} />
        <stop
          offset='100%'
          style={{ stopColor: '#FF9E80', stopOpacity: 0.9 }}
        />
      </linearGradient>
    </defs>
    <path
      d='M50,10 C65,10 80,25 80,40 C80,65 50,90 50,90 C50,90 20,65 20,40 C20,25 35,10 50,10 Z'
      fill='url(#locationGradient)'
    />
    <circle cx='50' cy='40' r='10' fill='white' fillOpacity='0.5' />
  </svg>
)

export const DatingMessageIcon: React.FC<SVGIconProps> = ({
  className,
  width = 50,
  height = 50,
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 512 512'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <defs>
      <linearGradient id='messageGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style={{ stopColor: '#FED330', stopOpacity: 0.9 }} />
        <stop
          offset='100%'
          style={{ stopColor: '#F7B731', stopOpacity: 0.9 }}
        />
      </linearGradient>
      <linearGradient id='heartGradient2' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' style={{ stopColor: '#FF6B6B', stopOpacity: 0.9 }} />
        <stop
          offset='100%'
          style={{ stopColor: '#FF9E80', stopOpacity: 0.9 }}
        />
      </linearGradient>
    </defs>

    {/* Message bubble left */}
    <path
      d='M150,130 C135,130 125,140 125,155 L125,230 C125,245 135,255 150,255 L175,255 L175,280 L200,255 L230,255 C245,255 255,245 255,230 L255,155 C255,140 245,130 230,130 Z'
      fill='url(#messageGradient)'
    />

    {/* Message bubble right */}
    <path
      d='M362,190 C377,190 387,200 387,215 L387,290 C387,305 377,315 362,315 L337,315 L337,340 L312,315 L282,315 C267,315 257,305 257,290 L257,215 C257,200 267,190 282,190 Z'
      fill='url(#messageGradient)'
    />

    {/* Heart in center */}
    <path
      d='M256,380 C254.5,378.5 235,365 235,350 C235,340 243,332 252,332 C256,332 260,334 262,337 C264,334 268,332 272,332 C282,332 289,340 289,350 C289,365 257.5,378.5 256,380 Z'
      fill='url(#heartGradient2)'
    />

    {/* Message lines in left bubble */}
    <line
      x1='140'
      y1='170'
      x2='240'
      y2='170'
      stroke='white'
      strokeWidth='10'
      strokeLinecap='round'
    />
    <line
      x1='140'
      y1='195'
      x2='220'
      y2='195'
      stroke='white'
      strokeWidth='10'
      strokeLinecap='round'
    />
    <line
      x1='140'
      y1='220'
      x2='200'
      y2='220'
      stroke='white'
      strokeWidth='10'
      strokeLinecap='round'
    />

    {/* Message lines in right bubble */}
    <line
      x1='272'
      y1='230'
      x2='372'
      y2='230'
      stroke='white'
      strokeWidth='10'
      strokeLinecap='round'
    />
    <line
      x1='272'
      y1='255'
      x2='352'
      y2='255'
      stroke='white'
      strokeWidth='10'
      strokeLinecap='round'
    />
    <line
      x1='272'
      y1='280'
      x2='332'
      y2='280'
      stroke='white'
      strokeWidth='10'
      strokeLinecap='round'
    />
  </svg>
)

export const DateIcons = {
  HeartIcon,
  ChatBubbleIcon,
  LocationPinIcon,
  DatingMessageIcon,
}

export default DateIcons
