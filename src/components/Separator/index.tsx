import React from 'react';

import type { Refs } from '../../types';

import { dataKeyAttribute, dataIndexAttribute } from '../../constants';

export type Props = {
  id: string;
  index: number;
  refs: Refs;
  className: string;
  separatorStyles: React.CSSProperties;
};

function Separator({ className, id, index, refs, separatorStyles }: Props) {
  const ref = React.useRef(null);
  refs[index] = ref;

  return (
    <div
      className={className}
      style={separatorStyles}
      {...{ [dataKeyAttribute]: id, [dataIndexAttribute]: index }}
      ref={ref}
    />
  );
}

export default React.memo(Separator);
