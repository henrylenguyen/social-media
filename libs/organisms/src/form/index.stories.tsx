import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './form'

/**
 * Form component from shadcn UI
 */
const meta: Meta<typeof Form> = {
  title: 'Organisms/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
}

export default meta
type Story = StoryObj<typeof Form>

/**
 * Default Form component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
}
