import React from 'react';
import Feedback from '@site/src/components/Feedback';

export default function Root({children}) {
  return (
    <>
      {children}
      <Feedback />
    </>
  );
}
