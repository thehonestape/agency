import { ComponentType, ReactNode } from 'react';
import { MenuProps } from '@headlessui/react';

export interface DropdownProps extends MenuProps {}

export interface DropdownButtonProps {
  as?: ComponentType<any>;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export interface DropdownMenuProps {
  anchor?: 'bottom' | 'top' | 'left' | 'right';
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

export interface DropdownItemProps {
  className?: string;
  children: ReactNode;
  href?: string;
  [key: string]: any;
}

export interface DropdownHeaderProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

export interface DropdownSectionProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

export interface DropdownHeadingProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

export interface DropdownDividerProps {
  className?: string;
  [key: string]: any;
}

export interface DropdownLabelProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

export interface DropdownDescriptionProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

export interface DropdownShortcutProps {
  keys: string | string[];
  className?: string;
  [key: string]: any;
}

declare module './catalyst-ui-kit/javascript/dropdown' {
  export function Dropdown(props: DropdownProps): JSX.Element;
  export function DropdownButton(props: DropdownButtonProps): JSX.Element;
  export function DropdownMenu(props: DropdownMenuProps): JSX.Element;
  export function DropdownItem(props: DropdownItemProps): JSX.Element;
  export function DropdownHeader(props: DropdownHeaderProps): JSX.Element;
  export function DropdownSection(props: DropdownSectionProps): JSX.Element;
  export function DropdownHeading(props: DropdownHeadingProps): JSX.Element;
  export function DropdownDivider(props: DropdownDividerProps): JSX.Element;
  export function DropdownLabel(props: DropdownLabelProps): JSX.Element;
  export function DropdownDescription(props: DropdownDescriptionProps): JSX.Element;
  export function DropdownShortcut(props: DropdownShortcutProps): JSX.Element;
} 