import * as React from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

// Define a type for the icon names
type IconName = keyof typeof LucideIcons;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}: IconProps) {
  // Ensure the icon name exists in LucideIcons
  if (!(name in LucideIcons) || typeof LucideIcons[name] !== 'function') {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }

  // Get the icon component
  const IconComponent = LucideIcons[name] as React.ComponentType<any>;

  return (
    <IconComponent
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={cn("", className)}
      {...props}
    />
  );
}
