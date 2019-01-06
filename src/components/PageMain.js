import React from 'react';
import { buildLink } from './utilites';

class PageMain extends React.Component {
  state = {};

  renderCategoryGrid() {
    return this.props.category.map((element, index) => {
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

export { PageMain };
