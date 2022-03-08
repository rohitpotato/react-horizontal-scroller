import React from 'react';
import { useRef } from 'react';
import { Refs } from '../../types';
import { dataIndexAttribute, dataKeyAttribute } from '../../constants';

interface Props {
  id: number;
  index: number;
  refs: Refs;
}

const Item: React.FC<Props> = ({ children, id, index, refs }) => {
  const ref = useRef(null);
  refs[String(index)] = ref;
  return (
    <div {...{ [dataKeyAttribute]: id, [dataIndexAttribute]: index }} ref={ref}>
      {children}
    </div>
  );
};

export default Item;
