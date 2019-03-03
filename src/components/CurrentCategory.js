import React from 'react';
import { config, buildLink } from './utilites';
const { name, caption } = config;

export class CurrentCategory extends React.Component {
  buildTailCell(index, name, caption) {
    const picName = name + index + '.jpg';
    return (
      <div className="TileCell" key={index}>
        <a href={buildLink(this.props.catNum, index)}>
          <div className="TileCellPic">
            <img src={'./Pictures/Preview/' + picName} alt={picName} />
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

  renderTileGrid() {
    return this.props.subCategory.map((item, index) => {
      //Массив начинается с 0, таблицв БД с 1, первый элемент пустой
      if (index === 0) return '';
      return this.buildTailCell(index, item[name], item[caption]);
    });
  }

  render() {
    return <div className="TileGrid">{this.renderTileGrid()}</div>;
  }
}
