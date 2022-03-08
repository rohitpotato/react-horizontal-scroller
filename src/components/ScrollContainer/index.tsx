import React from 'react';
import { defaultScrollContainerStyles } from '../../styles';

interface Props {
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  onScroll: (ev: React.UIEvent) => void;
  scrollContainerStyles: React.CSSProperties;
}

const ScrollContainer: React.FC<Props> = ({
  scrollRef,
  children,
  onScroll,
  scrollContainerStyles,
}) => {
  return (
    <div
      onScroll={onScroll}
      ref={scrollRef}
      style={{ ...defaultScrollContainerStyles, ...scrollContainerStyles }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
