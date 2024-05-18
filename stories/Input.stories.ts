import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input, Variants } from './Input';

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Input
 */
export const Default: Story = {
  args: {
    label: 'Input',
  },
};

/**
 * Not Verified Input
 */
export const NotVerified: Story = {
  args: {
    label: 'Not Verified',
    isNotVerified: true,
  },
};

/**
 * Required Input
 */
export const Required: Story = {
  args: {
    variant: Variants.required,
    label: 'Required',
  },
};

/**
 * Disabled Input
 */
export const Disabled: Story = {
  args: {
    variant: Variants.disabled,
    label: 'Disabled',
  },
};
