import { LinkBadgeProps, LinkBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagProps extends LinkBadgeProps {
  /**
   * Link contents
   */
  label: string;
  /**
   * Where the button should link to
   */
  href: `/${string}` | "#";
}

/**
 * Primary UI component for user interaction
 */
export const Tag = ({ label, href, className, ...props }: TagProps) => {
  return (
    <LinkBadge
      className={cn(
        "px-2 py-1 text-xs text-primary hover:text-white font-extralight bg-primary/50 hover:bg-primary/80 focus:ring-primary",
        className
      )}
      href={href ? href : "#"}
      {...props}
    >
      {"#"}
      {label}
    </LinkBadge>
  );
};
