import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

/**
 * Input component from shadcn UI
 */
const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Default Input component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
};
