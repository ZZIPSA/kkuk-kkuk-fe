import { cn } from '@/lib/utils';

export const Loading = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  // https://github.com/shadcn-ui/ui/discussions/1694#discussioncomment-7477119
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('animate-spin', className)}
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
