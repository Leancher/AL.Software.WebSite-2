import React from "react";
import { config } from "./config";

class PageMain extends React.Component {
  state = {};

  buildLink = item => window.location.origin + config.defaultPage + "?category=" + item;

  renderCategoryGrid() {
    return this.props.category.map((element, index) => {
      console.log(index);
      if (index === 0) return "";
      return (
        <div key={index} className="TileCell">
          <a href={this.buildLink(element)}>
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
        {/* <span>{ this.state.location.origin }</span>  */}
        <div className="TileGrid">{this.renderCategoryGrid()}</div>
      </React.Fragment>
    );
  }
}

export { PageMain };
