import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './calendar'

/**
 * Calendar component
 */
const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa controls cho component props tại đây
    className: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

/**
 * Default Calendar component
 */
export const Default: Story = {
  args: {
    // Định nghĩa props mặc định tại đây
    'data-testid': 'calendar',
    className: 'calendar-container',
    children: 'Calendar Example',
  },
}

/**
 * Customized Calendar example
 */
export const Customized: Story = {
  args: {
    // Định nghĩa props tùy chỉnh tại đây
    'data-testid': 'calendar-customized',
    className: 'calendar-customized',
    children: 'Customized Calendar',
  },
}
