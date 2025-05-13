import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

/**
 * Button component from shadcn UI
 */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Default Button component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
}
