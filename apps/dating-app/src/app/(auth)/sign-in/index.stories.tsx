import type { Meta, StoryObj } from '@storybook/react'
import SignIn from './signIn'

const meta: Meta<typeof SignIn> = {
  title: 'Pages/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SignIn>

/**
 * Mặc định hiển thị form đăng nhập
 */
export const Default: Story = {}
