import React, { Fragment } from 'react';
// import './Map.css';

const ArrayMap = ({ data, children }) =>
  data.map((x, i) => <Fragment key={i}>{children(x, i)}</Fragment>);

export default ArrayMap;
