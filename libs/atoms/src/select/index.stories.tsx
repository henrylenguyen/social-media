import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './select'

/**
 * Select component from shadcn UI
 */
const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
}

export default meta
type Story = StoryObj<typeof Select>

/**
 * Default Select component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
}
