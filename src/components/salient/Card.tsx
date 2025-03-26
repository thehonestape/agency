import React from 'react';
import { Card as BaseCard, CardProps as BaseCardProps } from '../../components/adaptable/Card';

// Salient card component
const Card = (props: BaseCardProps) => {
  // Salient specific styling can be added here
  // For now, we'll just use the base card component
  return <BaseCard {...props} />;
};

export default Card; 