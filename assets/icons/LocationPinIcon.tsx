import React from 'react'

interface SVGIconProps {
  className?: string
  width?: number
  height?: number
}

const LocationPinIcon: React.FC<SVGIconProps> = ({
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

export default LocationPinIcon
