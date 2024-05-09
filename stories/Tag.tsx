import { MouseEventHandler } from "react";
import {
  ButtonBadgeProps,
  ButtonBadge,
  BadgeVariant,
} from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export enum Uses {
  default = "default",
  selected = "selected",
}

const variants: Record<Uses, BadgeVariant> = {
  [Uses.default]: "default",
  [Uses.selected]: "secondary",
} as const;

const classNames = {
  [Uses.default]:
    "bg-primary/40 text-primary font-extralight hover:text-white focus:ring-primary",
  [Uses.selected]:
    "bg-lime-500/50 text-lime-800 font-extralight hover:text-white hover:bg-lime-500/80 focus:ring-lime-500",
} as const;

interface TagProps extends ButtonBadgeProps {
  /**
   * Variants for the Tag
   */
  use?: Uses;
  /**
   * Link contents
   * @default "default"
   */
  label: string;
  /**
   * Click handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
/**
 * Primary UI component for user interaction
 */
export const Tag = ({
  use = Uses.default,
  label,
  className,
  ...props
}: TagProps) => {
  return (
    <ButtonBadge
      className={cn(classNames[use], className)}
      variant={variants[use]}
      {...props}
    >
      {"#"}
      {label}
    </ButtonBadge>
  );
};
