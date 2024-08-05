import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const variant = {
  default: 'border-transparent bg-primary/80 text-primary-foreground bg-primary/40 text-primary hover:bg-primary hover:text-white',
};
export type TagVariant = keyof typeof variant;

const tagVariants = cva('font-normal break-keep text-nowrap inline-flex items-center rounded-full border px-2 py-1 text-xs transition-colors', {
  variants: { variant },
  defaultVariants: { variant: 'default' },
});

export interface TagProps extends React.HTMLAttributes<HTMLAnchorElement>, VariantProps<typeof tagVariants> {
  label: string;
}

export const Tag = ({ label, className, variant, ...props }: TagProps) => {
  const href = `/kits/tags?tag=${label}`;
  return (
    <Link href={href} className={cn(tagVariants({ variant }), className)} {...props}>
      {`#${label}`}
    </Link>
  );
};
