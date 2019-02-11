import React from 'react';

const withClasses = (WrappingComponent, className) => {
  return (props) => (
    <div className={className}>
      <WrappingComponent {...props} />
    </div>
  );
}

export default withClasses;