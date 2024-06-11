import type { Meta, StoryObj } from '@storybook/react';
import { TextInput, Variants } from './Input';

const meta = {
  title: 'Example/Input',
  component: TextInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

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
