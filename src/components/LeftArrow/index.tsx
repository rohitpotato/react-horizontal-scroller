import React from 'react';
import { useScroller } from '../../context';
import { defaultLeftArrowStyle } from '../../styles';

const LeftArrow: React.FC = (props) => {
  const { scrollPrev, isFirstItemVisible } = useScroller();
  const buttonOpacity = isFirstItemVisible ? { opacity: 0 } : { opacity: 1 };

  return (
    <>
      <button
        style={{ ...defaultLeftArrowStyle, ...buttonOpacity }}
        onClick={() => scrollPrev()}
        {...props}
      >
        Prev
      </button>
    </>
  );
};

export default LeftArrow;
