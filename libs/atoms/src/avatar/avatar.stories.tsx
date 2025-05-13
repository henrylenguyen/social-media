import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './avatar';

/**
 * Avatar component from shadcn UI
 */
const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for the component props here
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default Avatar component
 */
export const Default: Story = {
  args: {
    // Define default props here
  },
};
