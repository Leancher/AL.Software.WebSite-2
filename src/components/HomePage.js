import React from 'react';
import { buildLink } from './utilites';

export class HomePage extends React.Component {
  renderCategoryGrid() {
    return this.props.categoriesList.map((element, index) => {
      if (index === 0) return '';
      return (
        <div key={index} className="TileCell">
          <a href={buildLink(index, '')}>
            <div className="TileCellPic">
              <img src={'./Pictures/Main/' + element[0] + '.png'} alt="alt" />
            </div>
            <div className="TileCellCaption">{element[1]}</div>
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <img src="./Pictures/Main/background.jpg" alt="background" width="100%" />
        <div className="TileGrid">{this.renderCategoryGrid()}</div>
      </React.Fragment>
    );
  }
}
