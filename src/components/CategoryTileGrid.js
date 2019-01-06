import React from 'react';
import { buildLink } from './utilites';

class CategoryTileGrid extends React.Component {
  renderTileGrid() {
    const propsCat = this.props.category;
    const nameCat = this.props.nameCat;
    const numberCat = this.props.numberCat;
    const tileGrid = [];
    for (let i = 0; i < propsCat.length; i += 1) {
      const caption = propsCat[i][0];
      tileGrid.push(
        <div className="TileCell" key={i}>
          <a href={buildLink(numberCat, i + 1)}>
            <div className="TileCellPic">
              <img
                src={'./Pictures/Preview/' + nameCat + (i + 1) + '.jpg'}
                alt="image1"
              />
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
    return <div className="TileGrid">{tileGrid}</div>;
  }
  render() {
    return <React.Fragment>{this.renderTileGrid()}</React.Fragment>;
  }
}

export { CategoryTileGrid };
