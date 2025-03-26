import React from 'react';
import { Button as BaseButton, ButtonProps as BaseButtonProps } from '../../components/adaptable/Button';

// Protocol button component
const Button = (props: BaseButtonProps) => {
  // Protocol specific styling can be added here
  // For now, we'll just use the base button component
  return <BaseButton {...props} />;
};

export default Button; 