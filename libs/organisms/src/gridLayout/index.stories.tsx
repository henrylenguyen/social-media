import type { Meta, StoryObj } from '@storybook/react'
import GridLayout from './gridLayout'

const meta: Meta<typeof GridLayout> = {
  title: 'Organisms/GridLayout',
  component: GridLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof GridLayout>

export const Default: Story = {
  args: {
    leftChildren: <div>left</div>,
    rightChildren: <div>right</div>,
  },
}
