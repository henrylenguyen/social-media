import * as React from 'react';

interface ILogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Logo: React.FunctionComponent<ILogoProps> = ({
  className,
  width,
  height,
}) => {
  return (
    <svg
      width={width || '180'}
      height={height || '48'}
      viewBox='0 0 180 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`max-h-12 w-auto ${className}`}
    >
      <defs>
        {/* Gradient cho heart icon */}
        <linearGradient id='heartGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#FF6B6B' />
          <stop offset='50%' stopColor='#FF8E8E' />
          <stop offset='100%' stopColor='#FFB3B3' />
        </linearGradient>

        {/* Gradient cho text */}
        <linearGradient id='textGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stopColor='#1F2937' />
          <stop offset='100%' stopColor='#374151' />
        </linearGradient>

        {/* Shadow filter */}
        <filter id='textShadow' x='-20%' y='-20%' width='140%' height='140%'>
          <feDropShadow
            dx='0'
            dy='1'
            stdDeviation='1'
            floodColor='rgba(0,0,0,0.1)'
          />
        </filter>
      </defs>

      {/* Background circle cho heart */}
      <circle cx='20' cy='24' r='16' fill='#FFF5F5' opacity='0.8' />

      {/* Heart shape với hiệu ứng đẹp hơn */}
      <path
        d='M20 34l-2.5-2.27C12.5 27.36 8 23.28 8 18.5 8 15.42 10.42 13 13.5 13c1.74 0 3.41.81 4.5 2.09C19.09 13.81 20.76 13 22.5 13 25.58 13 28 15.42 28 18.5c0 4.78-4.5 8.86-9.5 13.23L20 34z'
        fill='url(#heartGradient)'
        filter='url(#textShadow)'
      />

      {/* Connector line với gradient */}
      <line
        x1='36'
        y1='24'
        x2='48'
        y2='24'
        stroke='url(#heartGradient)'
        strokeWidth='3'
        strokeLinecap='round'
        opacity='0.7'
      />

      {/* Brand text với typography đẹp hơn */}
      <g filter='url(#textShadow)'>
        <text
          x='52'
          y='20'
          fontFamily='Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          fontSize='16'
          fontWeight='800'
          fill='url(#textGradient)'
          letterSpacing='-0.8px'
        >
          Heart
        </text>
        <text
          x='52'
          y='36'
          fontFamily='Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          fontSize='16'
          fontWeight='500'
          fill='url(#textGradient)'
          letterSpacing='-0.4px'
          opacity='0.8'
        >
          Link
        </text>
      </g>

      {/* Decorative elements */}
      <circle cx='115' cy='16' r='2' fill='#FF6B6B' opacity='0.6'>
        <animate
          attributeName='opacity'
          values='0.4;0.8;0.4'
          dur='3s'
          repeatCount='indefinite'
        />
      </circle>
      <circle cx='122' cy='24' r='1.5' fill='#FF8E8E' opacity='0.7'>
        <animate
          attributeName='opacity'
          values='0.5;0.9;0.5'
          dur='2.5s'
          repeatCount='indefinite'
        />
      </circle>
      <circle cx='118' cy='32' r='1.8' fill='#FFB3B3' opacity='0.6'>
        <animate
          attributeName='opacity'
          values='0.3;0.7;0.3'
          dur='3.5s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
  )
};

export default Logo;

