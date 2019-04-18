import React from 'react';
import { buildLink } from './utilites';

export function Header(props) {
  let logoName = props.catName;
  if (!logoName) logoName = 'Main';
  return (
    <div className="row justify-content-between header">
      <div className="col-auto mr-auto HeaderTitle">
        <a href="/">
          <img src={'./Pictures/Logo/' + logoName + '.png'} alt="logo" />
          LEANCHER
        </a>
      </div>
      <div className="col-auto HeaderMenu">
        <a href={buildLink(8)}>Статистика</a>
        <a href="#linkAbout">О сайте</a>
      </div>
    </div>
  );
}
