import type { IOItem, Item, visibleItems as itemsArr } from '../types';
import { filterSeparators } from '../helpers';
class ItemsMap extends Map<Item[0], Item[1]> {
  toArr() {
    return this.sort([...this]);
  }

  toItems(): itemsArr {
    return this.toArr().map(([key]) => key);
  }
  public toItemsWithoutSeparators(): itemsArr {
    return filterSeparators(this.toItems());
  }
  sort(arr: Item[]) {
    return arr.sort(
      ([, IOItemA], [, IOItemB]) => +IOItemA.index - +IOItemB.index
    );
  }

  set(key: Array<Item> | string, val?: IOItem): this {
    if (Array.isArray(key)) {
      this.sort(key).forEach(([itemId, ioitem]) => {
        super.set(itemId, ioitem);
      });
    } else {
      super.set(key, val!);
    }
    return this;
  }

  first(): IOItem | undefined {
    return this.toArr()[0]?.[1];
  }
  last(): IOItem | undefined {
    return this.toArr().slice(-1)?.[0]?.[1];
  }

  filter(
    predicate: (value: Item, index: number, array: Item[]) => boolean
  ): Item[] {
    return this.toArr().filter(predicate);
  }

  prev(item: string | IOItem): IOItem | undefined {
    const arr = this.toArr();
    const current = arr.findIndex(
      ([itemId, ioitem]) => itemId === item || ioitem === item
    );
    return current !== -1 ? arr[current - 1]?.[1] : undefined;
  }
  next(item: IOItem | string): IOItem | undefined {
    const arr = this.toArr();
    const current = arr.findIndex(
      ([itemId, ioitem]) => itemId === item || ioitem === item
    );
    return current !== -1 ? arr[current + 1]?.[1] : undefined;
  }

  getVisible() {
    return this.filter((value) => value[1].visible);
  }
}
export default ItemsMap;
