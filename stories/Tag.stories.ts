import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tag, Uses } from "./Tag";

const meta = {
  title: "Example/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Tag
 */
export const Default: Story = {
  args: {
    label: "Tag",
  },
};

/**
 * Selected Tag
 */
export const Selected: Story = {
  args: {
    use: Uses.selected,
    label: "Selected",
  },
};
