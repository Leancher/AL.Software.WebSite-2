import React from "react";
import { buildLink } from "./utilites";

class PageMain extends React.Component {
  state = {};

  renderCategoryGrid() {
    return this.props.category.map((element, index) => {
      if (index === 0) return "";
      return (
        <div key={index} className="TileCell">
          <a href={buildLink(element)}>
            <div className="TileCellPic">
              <img src={"./Pictures/Main/" + element + ".png"} alt="alt" />
            </div>
            <div className="TileCellCaption">{element}</div>
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <img src="./Pictures/Main/background.jpg" alt="background.jpg" width="100%" />
        <div className="TileGrid">{this.renderCategoryGrid()}</div>
      </React.Fragment>
    );
  }
}

export { PageMain };
