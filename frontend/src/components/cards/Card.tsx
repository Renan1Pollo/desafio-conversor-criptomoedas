import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow p-6 ${className}`}>
      {children}
    </div>
  );
};
