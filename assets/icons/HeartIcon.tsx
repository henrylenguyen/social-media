import React from 'react'

interface SVGIconProps {
  className?: string
  width?: number
  height?: number
}

const HeartIcon: React.FC<SVGIconProps> = ({
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

export default HeartIcon
