import React from 'react';
import { buildLink } from './utilites';

export function NavMenu(props) {
  return (
    <div className="MainMenuLocate">
      <div className="MenuList">
        {props.category.map((element, index) => (
          <a href={buildLink(index, '')} key={index}>
            {element[1]}
          </a>
        ))}
      </div>
    </div>
  );
}
