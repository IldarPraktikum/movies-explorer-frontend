import React from 'react';
import './Rolling.css';

export default function Rolling({ children, additionalClass }) {
  const rollingClasses = `page__rolling ${additionalClass || ''}`;

  return (
    <div className={rollingClasses}>
      {children}
    </div>
  );
}

