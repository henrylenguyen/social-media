import type { Meta, StoryObj } from '@storybook/react'
import SignUpPage from './page'
const meta: Meta<typeof SignUpPage> = {
  title: 'Pages/SignUpPage',
  component: SignUpPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SignUpPage>

export const Default: Story = {
  args: {
    children: <div>children</div>,
  },
}
