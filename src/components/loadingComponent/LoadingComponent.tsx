import React, { ReactElement } from 'react';

const LoadingComponent = (): ReactElement => (
  <div className="loadingContainer">
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingComponent;
