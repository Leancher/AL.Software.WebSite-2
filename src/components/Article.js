import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import { fakeDelay, getSubCatNumber } from './utilites';

export function Article(props) {
  const catName = props.catName;
  const subCatNum = getSubCatNumber();

  const LoadableComponent = Loadable({
    loader: () => fakeDelay(200).then(() => import('../Content/' + catName + subCatNum)),
    loading: Loading
  });

  return (
    <div className="ContentColumn">
      <LoadableComponent />
    </div>
  );
}
