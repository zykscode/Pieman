/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import React from 'react';

interface AnimatedGradientTextProps {
  content: string;
  startColor: string;
  endColor: string;
  index?: number;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  content,
  startColor,
  endColor,
  index,

}) => {
   const styles = {
    '--content': content,
    '--start-color': startColor,
    '--end-color': endColor,
  } as React.CSSProperties;
  return (
    <span
      className={`animated-gradient-text_background animated-gradient-text_background-${index}  `}
      data-content={content}
      style={styles}
    >
      <span
        className={`animated-gradient-text_foreground animated-gradient-text_foreground-${index} p-2`}
      >
        {content}
      </span>
    </span>
  );
};

export default AnimatedGradientText;
