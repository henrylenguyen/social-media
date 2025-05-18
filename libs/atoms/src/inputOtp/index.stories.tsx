import type { Meta, StoryObj } from '@storybook/react'
import { InputOTP } from './inputOtp'

/**
 * InputOTP component
 */
const meta: Meta<typeof InputOTP> = {
  title: 'Atoms/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa controls cho component props tại đây
    className: { control: 'text' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof InputOTP>

/**
 * Default InputOTP component
 */
export const Default: Story = {}
