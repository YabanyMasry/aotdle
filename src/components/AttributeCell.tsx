import React from 'react';

interface AttributeCellProps {
  label: string;
  value: string;
  status: 'correct' | 'incorrect' | 'partial';
  direction?: 'higher' | 'lower';
  // ... other props if higher/lower needed ...
}

export const AttributeCell: React.FC<AttributeCellProps> = ({ label, value, status, direction }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'correct': return 'correct';
      case 'partial': return 'partial';
      case 'incorrect': return 'incorrect';
      default: return '';
    }
  };

  return (
    <div className={`cell ${getStatusColor()}`}>
      <span className="cell-label">{label}</span>
      <span className="cell-value">{value}</span>
          {status === 'partial' && direction && (
            <span className={`cell-hint ${direction}`}>
              {direction === 'higher' ? 'Earlier debut \u2191' : 'Later debut \u2193'}
            </span>
          )}
    </div>
  );
};
