import type { Meta, StoryObj } from '@storybook/react'
import FloatingIcons from './floatingIcons'

const meta: Meta<typeof FloatingIcons> = {
  title: 'Molecules/FloatingIcons',
  component: FloatingIcons,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'primary',
    },
  },
}

export default meta
type Story = StoryObj<typeof FloatingIcons>

export const Default: Story = {
  args: {
    items: [
      {
        id: 1,
        imageUrl: 'https://i.pravatar.cc/150?u=1',
        size: 'md',
      },
      {
        id: 2,
        imageUrl: 'https://i.pravatar.cc/150?u=2',
        size: 'sm',
      },
      {
        id: 3,
        imageUrl: 'https://i.pravatar.cc/150?u=3',
        size: 'lg',
      },
      {
        id: 4,
        imageUrl: 'https://i.pravatar.cc/150?u=4',
        size: 'md',
      },
      {
        id: 5,
        imageUrl: 'https://i.pravatar.cc/150?u=5',
        size: 'sm',
      },
      {
        id: 6,
        imageUrl: 'https://i.pravatar.cc/150?u=6',
        size: 'lg',
      },
      {
        id: 7,
        imageUrl: 'https://i.pravatar.cc/150?u=7',
        size: 'md',
      },
    ],
    haveContainer: true,
  },
}

export const FewerItems: Story = {
  args: {
    items: [
      {
        id: 1,
        imageUrl: 'https://i.pravatar.cc/150?u=1',
        size: 'lg',
      },
      {
        id: 2,
        imageUrl: 'https://i.pravatar.cc/150?u=2',
        size: 'md',
      },
      {
        id: 3,
        imageUrl: 'https://i.pravatar.cc/150?u=3',
        size: 'sm',
      },
    ],
    haveContainer: true,
  },
}
