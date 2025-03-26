'use client'

import * as React from "react"
import { Combobox as HeadlessCombobox, ComboboxButton as HeadlessComboboxButton, ComboboxInput as HeadlessComboboxInput, ComboboxOption as HeadlessComboboxOption, ComboboxOptions as HeadlessComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Label } from './label'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Necessary type definition for ComboboxOption
interface OptionRenderPropArg {
  active: boolean
  selected: boolean
  disabled: boolean
}

// Define variants for Combobox components using class-variance-authority
const comboboxInputVariants = cva(
  "block w-full rounded-md bg-background py-1.5 pr-12 pl-3 text-foreground outline-1 -outline-offset-1 outline-border placeholder:text-muted-foreground focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
  {
    variants: {
      size: {
        xs: "text-xs py-1",
        sm: "text-sm py-1.5",
        md: "text-base py-2",
        lg: "text-lg py-2.5",
        xl: "text-xl py-3",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        xs: "w-20",
        sm: "w-32",
        md: "w-48",
        lg: "w-64",
        xl: "w-96",
      },
      state: {
        default: "",
        error: "outline-destructive focus:outline-destructive",
        success: "outline-green-500 focus:outline-green-500",
        warning: "outline-yellow-500 focus:outline-yellow-500",
      },
    },
    defaultVariants: {
      size: "sm",
      width: "full",
      state: "default",
    },
  }
)

const comboboxOptionsVariants = cva(
  "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover py-1 text-popover-foreground shadow-md ring-1 ring-border focus:outline-hidden",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      maxHeight: {
        sm: "max-h-40",
        md: "max-h-60",
        lg: "max-h-80",
        xl: "max-h-96",
      },
    },
    defaultVariants: {
      size: "sm",
      maxHeight: "md",
    },
  }
)

const comboboxOptionVariants = cva(
  "group relative cursor-default select-none text-popover-foreground data-focus:bg-primary data-focus:text-primary-foreground data-focus:outline-hidden",
  {
    variants: {
      checkPosition: {
        right: "py-2 pr-9 pl-3",
        left: "py-2 pr-4 pl-8",
        none: "py-2 px-3",
      },
      padding: {
        xs: "py-1",
        sm: "py-1.5",
        md: "py-2",
        lg: "py-2.5",
        xl: "py-3",
      },
    },
    defaultVariants: {
      checkPosition: "right",
      padding: "md",
    },
  }
)

// Export the main Combobox component
const Combobox = HeadlessCombobox

// Create base versions of the combobox subcomponents
const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof HeadlessComboboxInput>,
  React.ComponentPropsWithoutRef<typeof HeadlessComboboxInput> & 
  VariantProps<typeof comboboxInputVariants>
>(({ className, size, width, state, ...props }, ref) => (
  <HeadlessComboboxInput
    ref={ref}
    className={cn(comboboxInputVariants({ size, width, state, className }))}
    {...props}
  />
))
ComboboxInput.displayName = "ComboboxInput"

const ComboboxButton = React.forwardRef<
  React.ElementRef<typeof HeadlessComboboxButton>,
  React.ComponentPropsWithoutRef<typeof HeadlessComboboxButton>
>(({ className, ...props }, ref) => (
  <HeadlessComboboxButton
    ref={ref}
    className={cn(
      "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden",
      className
    )}
    {...props}
  >
    <ChevronUpDownIcon className="size-5 text-muted-foreground" aria-hidden="true" />
  </HeadlessComboboxButton>
))
ComboboxButton.displayName = "ComboboxButton"

const ComboboxOptions = React.forwardRef<
  React.ElementRef<typeof HeadlessComboboxOptions>,
  React.ComponentPropsWithoutRef<typeof HeadlessComboboxOptions> &
  VariantProps<typeof comboboxOptionsVariants>
>(({ className, size, maxHeight, ...props }, ref) => (
  <HeadlessComboboxOptions
    ref={ref}
    className={cn(comboboxOptionsVariants({ size, maxHeight, className }))}
    {...props}
  />
))
ComboboxOptions.displayName = "ComboboxOptions"

// Custom types for ComboboxOption to handle render props pattern
type RenderPropChild<P> = 
  | React.ReactNode
  | ((props: P) => React.ReactNode)

interface ComboboxOptionProps extends Omit<React.ComponentPropsWithoutRef<typeof HeadlessComboboxOption>, 'children'>, 
  VariantProps<typeof comboboxOptionVariants> {
  showSelectedIcon?: boolean;
  children?: RenderPropChild<OptionRenderPropArg>;
}

const ComboboxOption = React.forwardRef<
  React.ElementRef<typeof HeadlessComboboxOption>,
  ComboboxOptionProps
>(({ className, checkPosition, padding, showSelectedIcon = true, children, ...props }, ref) => (
  <HeadlessComboboxOption
    ref={ref}
    className={cn(comboboxOptionVariants({ checkPosition, padding, className }))}
    {...props}
  >
    {({ selected, active, disabled }) => (
      <>
        {typeof children === 'function' 
          ? children({ selected, active, disabled }) 
          : children}
        
        {showSelectedIcon && selected && checkPosition === "right" && (
          <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-primary group-data-focus:text-primary-foreground group-data-selected:flex">
            <CheckIcon className="size-5" aria-hidden="true" />
          </span>
        )}
        
        {showSelectedIcon && selected && checkPosition === "left" && (
          <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 text-primary group-data-focus:text-primary-foreground group-data-selected:flex">
            <CheckIcon className="size-5" aria-hidden="true" />
          </span>
        )}
      </>
    )}
  </HeadlessComboboxOption>
))
ComboboxOption.displayName = "ComboboxOption"

// Helper functions
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  classNames
} 