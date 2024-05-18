import { BasicInputProps, BasicInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export enum Variants {
  default = 'default',
  required = 'required',
  disabled = 'disabled',
}

const classNames = {
  [Variants.default]: 'focus:border-primary',
  [Variants.required]: 'focus:border-primary',
  [Variants.disabled]: '',
} as const;

interface InputProps extends BasicInputProps {
  /**
   * Variants for the Input component.
   */
  variant?: Variants;
  /**
   * Label for the input and placeholder.
   * @default "default"
   */
  label: string;
  /**
   * Whether the input is verified or not.
   * For now, it takes parameter as a boolean.
   * But later it will take a callback to verify and process it internally.
   * @default false
   */
  isNotVerified?: boolean;
}
/**
 * Primary UI component for user interaction
 */
export const Input = ({ variant = Variants.default, label, isNotVerified = false, ...props }: InputProps) => {
  const isRequired = variant === Variants.required;
  return (
    <div>
      <label>
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <BasicInput
        className={cn(classNames[variant], {
          'border-red-500 focus:border-red-500': isNotVerified,
        })}
        disabled={variant === Variants.disabled}
        placeholder={label}
        {...props}
      />
    </div>
  );
};
