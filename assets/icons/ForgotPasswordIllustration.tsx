import * as React from 'react'

interface ForgotPasswordIllustrationProps {
  className?: string
  width?: number
  height?: number
}

const ForgotPasswordIllustration: React.FC<ForgotPasswordIllustrationProps> = ({
  className,
  width = 240,
  height = 240,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 800 800'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* Background Circle */}
      <circle cx='400' cy='400' r='350' fill='#3A1C71' fillOpacity='0.3' />
      {/* Email Envelope Base */}
      <rect x='200' y='280' width='400' height='240' rx='20' fill='#EAEAF4' />
      <path d='M200 320L400 440L600 320' stroke='#9E9EC8' strokeWidth='10' />
      {/* Lock */}
      <g transform='translate(320, 320)'>
        {/* Lock Body */}
        <rect
          x='0'
          y='40'
          width='160'
          height='120'
          rx='16'
          fill='url(#lockGradient)'
        />

        {/* Lock Shackle (Top Part) */}
        <path
          d='M40 40V0C40 -22.0914 58.9086 -40 80 -40V-40C101.091 -40 120 -22.0914 120 0V40'
          stroke='white'
          strokeWidth='16'
          strokeLinecap='round'
        />

        {/* Lock Keyhole */}
        <circle cx='80' cy='100' r='20' fill='white' />
        <path
          d='M80 100V140'
          stroke='white'
          strokeWidth='14'
          strokeLinecap='round'
        />
      </g>
      {/* Decorative Elements */}
      <g opacity='0.6'>
        {/* Email Icons */}
        <g transform='translate(170, 200) scale(0.5)'>
          <path d='M0 40L100 100L200 40' stroke='#9E9EC8' strokeWidth='6' />
          <rect
            x='0'
            y='0'
            width='200'
            height='120'
            rx='10'
            stroke='#9E9EC8'
            strokeWidth='6'
            fill='none'
          />
        </g>
        <g transform='translate(500, 520) scale(0.5)'>
          <path d='M0 40L100 100L200 40' stroke='#9E9EC8' strokeWidth='6' />
          <rect
            x='0'
            y='0'
            width='200'
            height='120'
            rx='10'
            stroke='#9E9EC8'
            strokeWidth='6'
            fill='none'
          />
        </g>
        {/* Keys */}
        <g transform='translate(170, 500) rotate(-15)'>
          <path
            d='M0 20C0 8.95431 8.95431 0 20 0H30V40H20C8.95431 40 0 31.0457 0 20Z'
            fill='#9E9EC8'
          />
          <rect x='30' y='15' width='60' height='10' fill='#9E9EC8' />
          <rect x='70' y='10' width='10' height='20' fill='#9E9EC8' />
          <rect x='90' y='10' width='10' height='20' fill='#9E9EC8' />
        </g>{' '}
        <g transform='translate(520, 180) rotate(15)'>
          <path
            d='M0 20C0 8.95431 8.95431 0 20 0H30V40H20C8.95431 40 0 31.0457 0 20Z'
            fill='#9E9EC8'
          />
          <rect x='30' y='15' width='60' height='10' fill='#9E9EC8' />
          <rect x='70' y='10' width='10' height='20' fill='#9E9EC8' />
          <rect x='90' y='10' width='10' height='20' fill='#9E9EC8' />
        </g>
      </g>
      {/* Sparkles */}
      <g>
        <circle cx='230' cy='230' r='10' fill='white' fillOpacity='0.6' />
        <circle cx='570' cy='230' r='8' fill='white' fillOpacity='0.6' />
        <circle cx='230' cy='570' r='8' fill='white' fillOpacity='0.6' />
        <circle cx='570' cy='570' r='10' fill='white' fillOpacity='0.6' />

        <circle cx='300' cy='180' r='5' fill='white' fillOpacity='0.4' />
        <circle cx='500' cy='180' r='5' fill='white' fillOpacity='0.4' />
        <circle cx='300' cy='620' r='5' fill='white' fillOpacity='0.4' />
        <circle cx='500' cy='620' r='5' fill='white' fillOpacity='0.4' />
        <circle cx='180' cy='300' r='5' fill='white' fillOpacity='0.4' />
        <circle cx='180' cy='500' r='5' fill='white' fillOpacity='0.4' />
        <circle cx='620' cy='300' r='5' fill='white' fillOpacity='0.4' />
        <circle cx='620' cy='500' r='5' fill='white' fillOpacity='0.4' />
      </g>
      {/* Floating Padlocks */}
      <g opacity='0.5'>
        <g transform='translate(160, 380) scale(0.3)'>
          <rect x='0' y='30' width='80' height='60' rx='8' fill='#FF6B6B' />
          <path
            d='M20 30V15C20 6.71573 26.7157 0 35 0V0C43.2843 0 50 6.71573 50 15V30'
            stroke='white'
            strokeWidth='8'
            strokeLinecap='round'
          />
        </g>{' '}
        <g transform='translate(600, 380) scale(0.3)'>
          <rect x='0' y='30' width='80' height='60' rx='8' fill='#FF6B6B' />
          <path
            d='M20 30V15C20 6.71573 26.7157 0 35 0V0C43.2843 0 50 6.71573 50 15V30'
            stroke='white'
            strokeWidth='8'
            strokeLinecap='round'
          />
        </g>
      </g>
      {/* Email Send Lines Animation Suggestion */}
      <path
        d='M400 440L400 500'
        stroke='#9E9EC8'
        strokeWidth='4'
        strokeDasharray='8 8'
      />
      <path
        d='M360 440L320 480'
        stroke='#9E9EC8'
        strokeWidth='4'
        strokeDasharray='8 8'
      />
      <path
        d='M440 440L480 480'
        stroke='#9E9EC8'
        strokeWidth='4'
        strokeDasharray='8 8'
      />{' '}
      {/* Gradients Definition */}
      <defs>
        <linearGradient
          id='lockGradient'
          x1='0'
          y1='40'
          x2='160'
          y2='160'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF6B6B' />
          <stop offset='1' stopColor='#FF9E80' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ForgotPasswordIllustration
