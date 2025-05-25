import type { Meta, StoryObj } from '@storybook/react'
import { usePathname } from 'next/navigation'

// Simple test component to verify pathname mocking
const TestPathnameComponent = () => {
  const pathname = usePathname()

  return (
    <div
      style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}
    >
      <h2>Pathname Test</h2>
      <p>
        Current pathname: <strong>{pathname}</strong>
      </p>
      <p>This should change based on story parameters.</p>
    </div>
  )
}

const meta: Meta<typeof TestPathnameComponent> = {
  title: 'Test/Pathname Mock',
  component: TestPathnameComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Discovery: Story = {
  parameters: {
    nextRouter: {
      pathname: '/discovery',
    },
  },
}

export const Chats: Story = {
  parameters: {
    nextRouter: {
      pathname: '/chats',
    },
  },
}

export const Events: Story = {
  parameters: {
    nextRouter: {
      pathname: '/events',
    },
  },
}
