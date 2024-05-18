import { InputProps, Input } from '@/components/ui/input';
import { TextareaProps, Textarea } from '@/components/ui/textarea';
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

interface TextInputProps extends Partial<InputProps & TextareaProps> {
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
   * Multiline input.
   * True use textarea, false use input.
   * @default false
   */
  multiline?: boolean;
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
export const TextInput = ({ variant = Variants.default, label, multiline = false, isNotVerified = false, ...props }: TextInputProps) => {
  const isRequired = variant === Variants.required;
  return (
    <label className="flex flex-col w-full mb-6">
      <p>
        {isRequired && <span className="text-red-500">*</span>}
        <span className="font-bold">{label}</span>
      </p>
      {multiline ? (
        <Textarea
          className={cn(classNames[variant], {
            'border-red-500 focus:border-red-500': isNotVerified,
          })}
          disabled={variant === Variants.disabled}
          placeholder={label}
          {...props}
        />
      ) : (
        <Input
          className={cn(classNames[variant], {
            'border-red-500 focus:border-red-500': isNotVerified,
          })}
          disabled={variant === Variants.disabled}
          placeholder={label}
          {...props}
        />
      )}
    </label>
  );
};
