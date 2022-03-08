import React from 'react';
import Separator from '../Separator';
import { Refs } from '../../types';
import Item from '../Item';
import { separatorString, separatorClassName } from '../../constants';
interface Props {
  refs: Refs;
  separatorClass: string;
  separatorStyles: React.CSSProperties;
}

const MenuItems: React.FC<Props> = ({
  children,
  refs,
  separatorStyles,
  separatorClass = '',
}) => {
  const childArray = React.Children.toArray(children);
  const itemsCount = childArray.length;
  const _separatorClass = `${separatorClassName} ${separatorClass}`;
  return (
    <>
      {childArray.map((child, index) => {
        const id = (child as JSX.Element)?.props?.itemId;
        const separatorId = id + separatorString;
        const isLastItem = index + 1 === itemsCount;

        return [
          <Item id={id} key={'menuItem__' + id} refs={refs} index={index}>
            {child}
          </Item>,
          !isLastItem && (
            <Separator
              separatorStyles={separatorStyles}
              className={_separatorClass}
              id={separatorId}
              refs={refs}
              key={separatorId}
              index={index + 0.1}
            />
          ),
        ];
      })}
    </>
  );
};

export default MenuItems;
