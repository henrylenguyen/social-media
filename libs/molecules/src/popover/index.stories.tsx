import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './popover'

/**
 * Popover component
 */
const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa controls cho component props tại đây
    className: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

/**
 * Default Popover component
 */
export const Default: Story = {
  args: {
    // Định nghĩa props mặc định tại đây
    'data-testid': 'popover',
    className: 'popover-container',
    children: 'Popover Example',
  },
}

/**
 * Customized Popover example
 */
export const Customized: Story = {
  args: {
    // Định nghĩa props tùy chỉnh tại đây
    'data-testid': 'popover-customized',
    className: 'popover-customized',
    children: 'Customized Popover',
  },
}
