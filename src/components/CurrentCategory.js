import React from 'react';
import { buildLink, getCategoryNumber } from './utilites';

function buildTailCell(catNum, index, name, caption) {
  const fileName = name + index + '.jpg';
  return (
    <div className="TileCell" key={index}>
      <a href={buildLink(catNum, index)}>
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
  const catNum = getCategoryNumber();
  return (
    <div className="TileGrid">
      {props.subCategories.map((item, index) => {
        //Массив начинается с 0, таблицв БД с 1, первый элемент пустой
        if (index === 0) return '';
        return buildTailCell(catNum, index, item[0], item[1]);
      })}
    </div>
  );
}
