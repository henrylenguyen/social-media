import type { Meta, StoryObj } from '@storybook/react'
import ForgotPasswordPage from './page'

const meta: Meta<typeof ForgotPasswordPage> = {
  title: 'Pages/ForgotPasswordPage',
  component: ForgotPasswordPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ForgotPasswordPage>

/**
 * Mặc định hiển thị form quên mật khẩu
 */
export const Default: Story = {}
