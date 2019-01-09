import React from 'react';
import { buildLink } from './utilites';

function buildTailCell(catNum, index, name, caption) {
  const fileName = name + (index + 1) + '.jpg';
  return (
    <div className="TileCell" key={index}>
      <a href={buildLink(catNum, index + 1)}>
        <div className="TileCellPic">
          <img src={'./Pictures/Preview/' + fileName} alt={fileName} />
        </div>
        <div className="TileCellCaption">
          {caption}
          <br />
          {caption.length < 40 ? <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : null}
        </div>
      </a>
    </div>
  );
}

export function CurrentCategory(props) {
  const captionCategory = props.category[1];
  return (
    <div className="ContentBlock">
      <div className="ContentCaption">{captionCategory}</div>
      <div className="TileGrid">
        {props.subCategories.map((item, index) => {
          console.log(item);
          return buildTailCell(props.catNum, index, props.category[0], item[0]);
        })}
      </div>
    </div>
  );
}
