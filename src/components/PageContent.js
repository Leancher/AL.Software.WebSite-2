import React from "react";

class PageContent extends React.Component {
  state = {
    location: window.location
  };
  renderMenuList() {
    return this.props.category.map(element => (
      <a href={window.location.origin + "/" + element}>{element}</a>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <div className="MainMenuLocate">
          <div className="MenuList">{this.renderMenuList()}</div>
        </div>
        <div className="ContentBlock">
          <div class="ContentCaption">Caption</div>
          <div ID="CategoryBlock">CategoryBlock</div>
          <div class="ContentColumn">
            <div ID="ArticleBlock">ArticleBlock</div>
          </div>
          <div ID="PhotoBlock">PhotoBlock</div>
          <p id="ErrorMessage">Error</p>
        </div>
      </React.Fragment>
    );
  }
}

export { PageContent };
