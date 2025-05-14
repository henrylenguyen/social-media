import type { Meta, StoryObj } from '@storybook/react';
import NumberStepWithText from './numberStepWithText';

const meta: Meta<typeof NumberStepWithText> = {
  title: 'Molecules/NumberStepWithText',
  component: NumberStepWithText,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'primary',
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NumberStepWithText>;

export const Default: Story = {
  args: {
    step: 1,
    children: 'Please proceed to the next step.',
  },
};

export const CustomColors: Story = {
  args: {
    step: 1,
    children: 'Custom colors applied',
    className: 'bg-yellow-500',
    textClassName: 'text-red-500',
  },
  parameters: {
    backgrounds: { default: 'secondary-blue' }
  }
};

export const LongText: Story = {
  args: {
    step: 2,
    children:
      <p>Long text that exceeds the normal length of the text. This is a test to see how the component handles long text and if it wraps correctly without breaking the layout.</p>,
  },
  parameters: {
    backgrounds: { default: 'secondary-purple' }
  }
}


