import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';
import { fakeDelay, parseQueryString } from './utilites';

export function Article(props) {
  const catName = props.catName;
  const qsCat = parseQueryString('cat');

  const LoadableComponent = Loadable({
    loader: () => fakeDelay(200).then(() => import('../Content/' + catName + qsCat)),
    loading: Loading
  });

  return (
    <div className="ContentColumn">
      <LoadableComponent catName={catName} />
    </div>
  );
}
