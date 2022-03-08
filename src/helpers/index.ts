import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import {
  ItemOrElement,
  CustomScrollBehavior,
  scrollToItemOptions,
  IOItem,
  Refs,
  visibleItems as visibleItemsType,
  Item,
} from '../types';
import { observerOptions } from '../settings';
import { separatorString } from '../constants';

export const getNodesFromRefs = (refs: Refs): HTMLElement[] => {
  const result = Object.values(refs)
    .map((el) => el.current)
    .filter(Boolean);

  return result as HTMLElement[];
};

export function observerEntriesToItems(
  entries: IntersectionObserverEntry[],
  options: typeof observerOptions
): Item[] {
  return [...entries].map((entry: IntersectionObserverEntry) => {
    const target = entry.target as HTMLElement;
    const key = target?.dataset?.key || '';
    const index = String(target?.dataset?.index || '');

    return [
      key,
      {
        index,
        key,
        entry,
        visible: entry.intersectionRatio >= options.ratio,
      },
    ];
  });
}

export function scrollToItem<T>(
  item: ItemOrElement,
  behavior?: ScrollBehavior | CustomScrollBehavior<T>,
  inline?: ScrollLogicalPosition,
  block?: ScrollLogicalPosition,
  rest?: scrollToItemOptions
): T | Promise<T> | void {
  const _item = (item as IOItem)?.entry?.target || item;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _behavior = (behavior || 'smooth') as ScrollBehavior;

  return (
    _item &&
    scrollIntoView(_item, {
      behavior: _behavior,
      inline: inline || 'end',
      block: block || 'nearest',
      duration: 500,
      ...rest,
    })
  );
}

export const filterSeparators = (items: visibleItemsType): visibleItemsType =>
  items.filter((item) => !new RegExp(`.*${separatorString}$`).test(item));
