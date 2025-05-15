import type { Meta, StoryObj } from '@storybook/react'
import CircleWithImage from './circleWithImage'

const meta: Meta<typeof CircleWithImage> = {
  title: 'Atoms/CircleWithImage',
  component: CircleWithImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light-dark',
    },
  },
}

export default meta
type Story = StoryObj<typeof CircleWithImage>

export const Default: Story = {
  args: {
    imageUrl: 'https://i.pravatar.cc/150?u=3',
  },
}
