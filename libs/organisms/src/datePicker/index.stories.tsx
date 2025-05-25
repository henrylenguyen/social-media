import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './datePicker'

/**
 * DatePicker component
 */
const meta: Meta<typeof DatePicker> = {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa controls cho component props tại đây
    className: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

/**
 * Default DatePicker component
 */
export const Default: Story = {
  args: {
    // Định nghĩa props mặc định tại đây
    'data-testid': 'datePicker',
    className: 'datePicker-container',
    children: 'DatePicker Example',
  },
}

/**
 * Customized DatePicker example
 */
export const Customized: Story = {
  args: {
    // Định nghĩa props tùy chỉnh tại đây
    'data-testid': 'datePicker-customized',
    className: 'datePicker-customized',
    children: 'Customized DatePicker',
  },
}
