import React from 'react';
import { buildLink } from './utilites';

export function Header(props) {
  let logoName = props.catName;
  if (!logoName) logoName = 'Main';
  return (
    <div className="header">
      <div className="HeaderTitle">
        <a href="/">
          <img src={'./Pictures/Logo/' + logoName + '.png'} alt="logo" />
          LEANCHER
        </a>
      </div>
      <div className="HeaderMenu">
        <a href={buildLink('statistics')} className="HeaderMenuItem">
          Статистика
        </a>
        <br />
        <a href="#linkAbout" className="HeaderMenuItem">
          О сайте
        </a>
      </div>
    </div>
  );
}
