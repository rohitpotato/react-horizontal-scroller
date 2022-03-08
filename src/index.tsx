import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import ItemsMap from './ItemsMap/ItemsMap';
import { observerOptions } from './settings';
import {
  MenuItems,
  ScrollContainer,
  LeftArrow as LeftArrowComponent,
  RightArrow as RightArrowComponent,
} from './components';
import createApi, { API } from './api/createApi';
import ScrollProvider, { useScroller, ScrollContext } from './context';
import { defaultWrapperStyles } from './styles';
import { Refs } from './types';
import useItemsChanged from './hooks/useItemsChanged';

interface Props {
  LeftArrow: React.ComponentType;
  RightArrow: React.ComponentType;
  wrapperProps: React.HTMLAttributes<HTMLDivElement>;
  transitionDuration?: number;
  transitionEase: (t: number) => number;
  transitionBehavior?: string | Function;
  onScroll: (api: API, ev: React.UIEvent) => void;
  scrollContainerStyles: React.CSSProperties;
  separatorClass: string;
  separatorStyles: React.CSSProperties;
}

const HorizontalScroller: React.FC<Props> = ({
  children,
  onScroll,
  wrapperProps = {},
  scrollContainerStyles = {},
  transitionBehavior = '',
  transitionDuration = 500,
  LeftArrow = null,
  RightArrow = null,
  transitionEase,
  separatorClass,
  separatorStyles,
}) => {
  const items = useRef(new ItemsMap()).current;
  const [menuItemsRefs] = useState<Refs>({});
  const onScrollRef = useRef<typeof onScroll | null>(null);
  const itemsChanged = useItemsChanged(children, items);
  const { visibleItems } = useIntersectionObserver({
    items,
    itemsChanged,
    options: observerOptions,
    refs: menuItemsRefs,
  });
  const scrollContainerRef = useRef(null);
  const { style = {}, ...rest } = wrapperProps;

  const api: API = useMemo(
    () =>
      createApi(items, visibleItems, scrollContainerRef, {
        duration: transitionDuration,
        ease: transitionEase,
        behavior: transitionBehavior,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, visibleItems, itemsChanged]
  );

  useEffect(() => {
    onScrollRef.current = onScroll;
  });

  const scrollHandler = useCallback(
    (ev: React.UIEvent) => {
      return onScrollRef.current?.(api, ev);
    },
    [api]
  );

  const mounted = !!visibleItems.length;

  const getContext = React.useCallback(
    () => ({
      ...api,
      initComplete: mounted,
      items,
      visibleItems,
      scrollContainer: scrollContainerRef,
    }),
    [api, mounted, items, visibleItems, scrollContainerRef]
  );

  const [context, setContext] = React.useState<API>(getContext);
  React.useEffect(() => setContext(getContext()), [getContext]);

  const renderLeftArrow = () => {
    if (LeftArrow) {
      return <LeftArrow />;
    }
    return <LeftArrowComponent />;
  };

  const renderRightArrow = () => {
    if (RightArrow) {
      return <RightArrow />;
    }
    return <RightArrowComponent />;
  };

  return (
    <ScrollProvider value={context}>
      <div style={{ ...defaultWrapperStyles, ...style }} {...rest}>
        {renderLeftArrow()}
        <ScrollContainer
          scrollContainerStyles={scrollContainerStyles}
          onScroll={scrollHandler}
          scrollRef={scrollContainerRef}
        >
          <MenuItems
            separatorClass={separatorClass}
            separatorStyles={separatorStyles}
            refs={menuItemsRefs}
          >
            {children}
          </MenuItems>
        </ScrollContainer>
        {renderRightArrow()}
      </div>
    </ScrollProvider>
  );
};

export default HorizontalScroller;
export { ScrollProvider, useScroller, ScrollContext };
