"use client";

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const selectTriggerVariants = cva(
  "flex items-center justify-between rounded-md border border-input bg-background ring-offset-background transition-all duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      size: {
        default: "h-10 px-3 py-2 text-sm",
        sm: "h-8 px-2 py-1 text-xs rounded-sm",
        lg: "h-12 px-4 py-3 text-base",
        xl: "h-14 px-5 py-4 text-lg rounded-lg",
      },
      width: {
        default: "w-full",
        auto: "w-auto",
        sm: "w-32",
        md: "w-64",
        lg: "w-96",
      },
      state: {
        default: "",
        error: "border-destructive focus:ring-destructive/30",
        success: "border-green-500 focus:ring-green-500/30",
        warning: "border-yellow-500 focus:ring-yellow-500/30",
      },
    },
    defaultVariants: {
      size: "default",
      width: "default",
      state: "default",
    },
  }
)

interface SelectTriggerProps 
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size, width, state, ...props }, ref) => {
  // Use the simplified theme context
  
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "select-trigger",
        selectTriggerVariants({ size, width, state, className })
      )}
      {...props}
      data-theme-refreshable
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <LuChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <LuChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <LuChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const selectContentVariants = cva(
  "relative z-50 max-h-96 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      positionStyle: {
        popper: "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        item: "",
      },
      size: {
        default: "min-w-[8rem]",
        sm: "min-w-[6rem]",
        md: "min-w-[10rem]",
        lg: "min-w-[15rem]",
        xl: "min-w-[20rem]",
        full: "min-w-[var(--radix-select-trigger-width)]",
      },
    },
    defaultVariants: {
      positionStyle: "popper",
      size: "default",
    },
  }
)

interface SelectContentProps 
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    Omit<VariantProps<typeof selectContentVariants>, "positionStyle"> {
  contentSize?: VariantProps<typeof selectContentVariants>["size"];
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", contentSize, ...props }, ref) => {
  // Use the simplified theme context
  
  // Map position prop to positionStyle for our variants
  const positionStyle = position === "popper" ? "popper" : "item";
  
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "select-content",
          selectContentVariants({ positionStyle, size: contentSize, className })
        )}
        position={position}
        {...props}
        data-theme-refreshable
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const selectLabelVariants = cva("font-semibold", {
  variants: {
    size: {
      default: "py-1.5 pl-8 pr-2 text-sm",
      sm: "py-1 pl-6 pr-2 text-xs",
      lg: "py-2 pl-8 pr-3 text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface SelectLabelProps 
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>,
    VariantProps<typeof selectLabelVariants> {}

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, size, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(selectLabelVariants({ size, className }))}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const selectItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      size: {
        default: "py-1.5 pl-8 pr-2 text-sm",
        sm: "py-1 pl-6 pr-2 text-xs",
        lg: "py-2 pl-8 pr-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface SelectItemProps 
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
    VariantProps<typeof selectItemVariants> {}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, size, ...props }, ref) => {
  // Use the simplified theme context
  
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "select-item",
        selectItemVariants({ size, className })
      )}
      {...props}
      data-theme-refreshable
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <LuCheck className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
})
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
  selectContentVariants,
  selectLabelVariants,
  selectItemVariants,
} 