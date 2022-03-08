import React from 'react';
import { useScroller } from '../../context';
import { defaultRightArrowStyle } from '../../styles';

const RightArrow: React.FC = (props) => {
  const { scrollNext, isLastItemVisible } = useScroller();
  const buttonOpacity = isLastItemVisible ? { opacity: 0 } : { opacity: 1 };
  return (
    <>
      <button
        style={{ ...defaultRightArrowStyle, ...buttonOpacity }}
        onClick={() => scrollNext()}
        {...props}
      >
        Next
      </button>
    </>
  );
};

export default RightArrow;
