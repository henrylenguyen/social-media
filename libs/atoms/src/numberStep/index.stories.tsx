import type { Meta, StoryObj } from '@storybook/react'
import NumberStep from './numberStep'

const meta: Meta<typeof NumberStep> = {
  title: 'Atoms/NumberStep',
  component: NumberStep,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light-dark',
    }
  },
}

export default meta
type Story = StoryObj<typeof NumberStep>

export const Default: Story = {
  args: {
    children: 1
  },
}

export const CustomColors: Story = {
  args: {
    children: 1,
    className: 'bg-red-500',
    textClassName: 'text-white',
  },
  parameters: {
    backgrounds: { default: 'secondary-blue' }
  }

}

export const CustomSize: Story = {
render : () =>  (
    <div className="flex items-center gap-4">
      <NumberStep className="h-8 w-8" textClassName="text-sm">1</NumberStep>
      <NumberStep className="h-12 w-12" textClassName="text-lg">2</NumberStep>
      <NumberStep className="h-16 w-16" textClassName="text-xl">3</NumberStep>
    </div>
  )
}
