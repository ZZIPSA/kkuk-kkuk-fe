import { MouseEventHandler } from "react";
import {
  BasicButton,
  BasicButtonProps,
  ButtonVariant,
  ButtonSize,
} from "@/components/ui/button";

interface ButtonProps extends BasicButtonProps {
  /**
   * What variant to use
   */
  variant?: ButtonVariant;
  /**
   * How large should the button be?
   */
  size?: ButtonSize;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional flag to render as a child
   */
  asChild?: boolean;
  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <BasicButton type="button" {...props}>
      {label}
    </BasicButton>
  );
};
