import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './drawer'

/**
 * Drawer component
 */
const meta: Meta<typeof Drawer> = {
  title: 'Molecules/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa controls cho component props tại đây
    className: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

/**
 * Default Drawer component
 */
export const Default: Story = {
  args: {
    // Định nghĩa props mặc định tại đây
    'data-testid': 'drawer',
    className: 'drawer-container',
    children: 'Drawer Example',
  },
}

/**
 * Customized Drawer example
 */
export const Customized: Story = {
  args: {
    // Định nghĩa props tùy chỉnh tại đây
    'data-testid': 'drawer-customized',
    className: 'drawer-customized',
    children: 'Customized Drawer',
  },
}
