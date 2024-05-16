import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Button',
    type: 'button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
    type: 'button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button',
    type: 'button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
    type: 'button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    label: 'Link Button',
    type: 'button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Destructive Button',
    type: 'button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'LargeButton',
    type: 'button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'SmallButton',
    type: 'button',
  },
};

export const WithIcon: Story = {
  args: {
    size: 'icon',
    label: '🚀',
    type: 'button',
  },
};
