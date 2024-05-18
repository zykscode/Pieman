/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import React from 'react';

interface AnimatedGradientTextProps {
  content: undefined | number;
  startColor: string;
  endColor: string;
  index?: number;
  type: string;
  delimit?: boolean;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  content,
  startColor,
  endColor,
  type,
  index,
  delimit,
}) => {
  const newContent = `${content} ${type} ${delimit ? ':' : ''}`;
  const styles = {
    '--content': newContent,
    '--start-color': startColor,
    '--end-color': endColor,
  } as React.CSSProperties;
  return (
    <span
      className={`animated-gradient-text_background animated-gradient-text_background-${index}  `}
      data-content={newContent}
      style={styles}
    >
      <span
        className={`animated-gradient-text_foreground animated-gradient-text_foreground-${index} p-2`}
      >
        {newContent}
      </span>
    </span>
  );
};

export default AnimatedGradientText;
