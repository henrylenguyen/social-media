import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AuthLayout from './AuthLayout';

const meta: Meta<typeof AuthLayout> = {
  title: 'Components/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  args: {
    children: <div>children</div>
  },
};
