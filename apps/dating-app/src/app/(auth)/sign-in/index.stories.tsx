import type { Meta, StoryObj } from '@storybook/react'
import SignInPage from './page'
const meta: Meta<typeof SignInPage> = {
  title: 'Pages/SignInPage',
  component: SignInPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SignInPage>

export const Default: Story = {
  args: {
    children: <div>children</div>,
  },
}
