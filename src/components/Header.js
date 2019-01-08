import React from 'react';
import { config } from './utilites';

export function Header(props) {
  return (
    <div className="header">
      <div className="HeaderTitle">
        <a href={config.defaultPage}>
          <img src={'./Pictures/Logo/' + props.catName + '.png'} alt="logo" />
          LEANCHER
        </a>
      </div>
      <div className="HeaderMenu">
        <a href="#linkStat" className="HeaderMenuItem">
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
