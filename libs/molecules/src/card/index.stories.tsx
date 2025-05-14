import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

/**
 * Card component from shadcn UI
 */
const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * Default Card component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
}
