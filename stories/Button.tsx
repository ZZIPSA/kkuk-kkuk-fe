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
   * What type of the button
   */
  type: "button" | "submit" | "reset";
  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, type = "button", ...props }: ButtonProps) => {
  return (
    <BasicButton type={type} {...props}>
      {label}
    </BasicButton>
  );
};
