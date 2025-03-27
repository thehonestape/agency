import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const tagInputVariants = cva(
  "flex flex-wrap gap-2 p-2 border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      // Size variants
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      // Visual variants
      variant: {
        default: "border-input bg-background",
        subtle: "border-subtle bg-subtle",
        muted: "border-muted bg-muted",
        inverse: "border-inverse bg-inverse",
      },
      // Container query support
      container: {
        true: "@container",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      container: false,
    },
  }
);

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium",
  {
    variants: {
      // Visual variants
      variant: {
        default: "bg-primary text-primary-foreground",
        subtle: "bg-subtle text-subtle-foreground",
        muted: "bg-muted text-muted-foreground",
        inverse: "bg-inverse text-inverse-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">,
    VariantProps<typeof tagInputVariants> {
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  maxTags?: number;
  onTagClick?: (tag: string) => void;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ 
    className, 
    size, 
    variant, 
    container, 
    value = [], 
    onChange, 
    label,
    description,
    error,
    required,
    placeholder = "Add tags...",
    maxTags,
    onTagClick,
    ...props 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const newTag = inputValue.trim();
        if (newTag && (!maxTags || value.length < maxTags)) {
          onChange?.([...value, newTag]);
          setInputValue("");
        }
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        onChange?.(value.slice(0, -1));
      }
    };

    const removeTag = (tagToRemove: string) => {
      onChange?.(value.filter(tag => tag !== tagToRemove));
    };

    return (
      <div className="space-y-2">
        {(label || description || error) && (
          <div className="space-y-1">
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </label>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        )}
        <div className={cn(tagInputVariants({ size, variant, container, className }))}>
          {value.map((tag) => (
            <span
              key={tag}
              className={cn(tagVariants({ variant }))}
              onClick={() => onTagClick?.(tag)}
            >
              {tag}
              <button
                type="button"
                className="ml-1 rounded-full hover:bg-black/10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : undefined}
            className="flex-1 bg-transparent outline-none"
            {...props}
          />
        </div>
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export { TagInput, tagInputVariants, tagVariants }; 