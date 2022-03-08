import { scrollToItem, filterSeparators } from '../helpers';
import {
  visibleItems,
  CustomScrollBehavior,
  scrollToItemOptions,
} from '../types';
import ItemsMap from '../ItemsMap/ItemsMap';
import React from 'react';

const createApi = (
  items: ItemsMap,
  visibleItems: visibleItems = [],
  boundaryElement: React.MutableRefObject<HTMLElement | null>,
  transitionOptions?: {
    duration?: number;
    ease?: (t: number) => number;
    behavior: string | Function;
  }
) => {
  const visibleItemsWithoutSeparators = filterSeparators(visibleItems);

  const getPrevItem = () => items.prev(items.getVisible()?.[0]?.[1]);
  const isItemVisible = (id: string) => visibleItems.includes(id);

  const getNextItem = () =>
    items.next(items.getVisible()?.slice?.(-1)?.[0]?.[1]);

  const isFirstItemVisible = !!items.first()?.visible;
  const isLastItemVisible = !!items.last()?.visible;

  const scrollPrev = <T>(
    behavior?: CustomScrollBehavior<T>,
    inline?: ScrollLogicalPosition,
    block?: ScrollLogicalPosition,
    {
      duration,
      ease,
      boundary = boundaryElement?.current,
    }: scrollToItemOptions = {}
  ) => {
    const _behavior = (behavior ??
      transitionOptions?.behavior) as ScrollBehavior;
    return scrollToItem(
      getPrevItem(),
      _behavior,
      inline || 'end',
      block || 'nearest',
      {
        boundary,
        duration: duration ?? transitionOptions?.duration,
        ease: ease ?? transitionOptions?.ease,
      }
    );
  };

  const scrollNext = <T>(
    behavior?: CustomScrollBehavior<T>,
    inline?: ScrollLogicalPosition,
    block?: ScrollLogicalPosition,
    {
      duration,
      ease,
      boundary = boundaryElement?.current,
    }: scrollToItemOptions = {}
  ) => {
    const _behavior = (behavior ??
      transitionOptions?.behavior) as ScrollBehavior;
    return scrollToItem(
      getNextItem(),
      _behavior,
      inline || 'start',
      block || 'nearest',
      {
        boundary,
        duration: duration ?? transitionOptions?.duration,
        ease: ease ?? transitionOptions?.ease,
      }
    );
  };

  return {
    scrollNext,
    scrollPrev,
    isFirstItemVisible,
    isLastItemVisible,
    visibleItems,
    isItemVisible,
    visibleItemsWithoutSeparators,
    items,
  };
};

export default createApi;

export interface API extends ReturnType<typeof createApi> {
  items: ItemsMap;
  visibleItems: visibleItems;
}
