import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import { fakeDelay, parseQueryString } from './utilites';

export function Article(props) {
  const catName = props.catName;
  const qsSubCat = parseQueryString('subCat');

  const LoadableComponent = Loadable({
    loader: () => fakeDelay(200).then(() => import('../Content/' + catName + qsSubCat)),
    loading: Loading
  });

  return (
    <div className="ContentColumn">
      <LoadableComponent catName={catName} />
    </div>
  );
}
