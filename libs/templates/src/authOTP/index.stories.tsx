import type { Meta, StoryObj } from '@storybook/react'
import AuthOTPComponent from './authOTP'

/**
 * AuthOTP component
 */
const meta: Meta<typeof AuthOTPComponent> = {
  title: 'Templates/AuthOTPComponent',
  component: AuthOTPComponent,
  tags: ['autodocs'],
  argTypes: {
    // Định nghĩa controls cho component props tại đây
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AuthOTPComponent>

export const Default: Story = {}
