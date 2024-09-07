import React, { ReactNode } from 'react';

interface CollapseProps {
  in: boolean;
  children: ReactNode;
}

export const Collapse: React.FC<CollapseProps> = ({ in: inProp, children }) => {
  return (
    <div style={{ maxHeight: inProp ? '1000px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
      {children}
    </div>
  );
};
