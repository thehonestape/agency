import React, { ReactNode } from 'react';
import { Container } from '../../../component-system';
import { createFlexLayout } from '../../../lib/composition/composeComponents';

interface TwoColumnLayoutProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
  className?: string;
  gap?: string;
  reverseOnMobile?: boolean;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  className = '',
  gap = '2rem',
  reverseOnMobile = false
}) => {
  const flexLayout = createFlexLayout('row', gap);
  
  return (
    <Container size="xl" className={className}>
      <div 
        className={`
          flex flex-col md:flex-row gap-${gap}
          ${reverseOnMobile ? 'md:flex-row-reverse' : ''}
        `}
      >
        <div className="flex-1">
          {leftColumn}
        </div>
        <div className="flex-1">
          {rightColumn}
        </div>
      </div>
    </Container>
  );
};

export default TwoColumnLayout; 