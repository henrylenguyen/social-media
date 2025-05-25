import type { Meta, StoryObj } from '@storybook/react'
import Header from './header'

/**
 * Header component hiển thị tiêu đề và các nút điều hướng.
 */
const meta: Meta<typeof Header> = {
  title: 'molecules/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light-dark',
    },
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {

}

