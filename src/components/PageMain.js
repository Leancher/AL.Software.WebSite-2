import React from "react";

class PageMain extends React.Component {
  state = {
    location: window.location
  };

  renderCategoryGrid() {
    return this.props.category.map((element, index) => {
      return (
        <div key={element.id} className="TileCell">
          <a href={window.location.origin + "/" + element}>
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
        <img
          src="./Pictures/Main/background.jpg"
          alt="background.jpg"
          Width="100%"
        />
        {/* <span>{ this.state.location.origin }</span>  */}
        <div className="TileGrid">{this.renderCategoryGrid()}</div>
      </React.Fragment>
    );
  }
}

export { PageMain };
