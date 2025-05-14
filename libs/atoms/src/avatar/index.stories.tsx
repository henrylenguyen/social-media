import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

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
 * Default Avatar component with image
 */
export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pinimg.com/736x/53/2b/c6/532bc640e5c10891c4b57dc432e84c34.jpg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Avatar with fallback when image fails to load
 */
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-image-url.jpg" alt="@broken" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Avatar with custom sizes
 */
export const CustomSize: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://i.pinimg.com/736x/53/2b/c6/532bc640e5c10891c4b57dc432e84c34.jpg" alt="@shadcn" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>

      <Avatar className="h-12 w-12">
        <AvatarImage src="https://i.pinimg.com/736x/53/2b/c6/532bc640e5c10891c4b57dc432e84c34.jpg" alt="@shadcn" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>

      <Avatar className="h-16 w-16">
        <AvatarImage src="https://i.pinimg.com/736x/53/2b/c6/532bc640e5c10891c4b57dc432e84c34.jpg" alt="@shadcn" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};
