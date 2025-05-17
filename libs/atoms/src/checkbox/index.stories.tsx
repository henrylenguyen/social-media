import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

/**
 * Checkbox component from shadcn UI
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

/**
 * Default Checkbox component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
}
