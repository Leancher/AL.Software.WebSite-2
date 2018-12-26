import React from "react";
import {CategoryTileGrid} from './CategoryTileGrid'
import { buildLink, getCategory } from "./utilites";

class PageContent extends React.Component {
  state = {};

  renderMenuList() {
    return (
      <div className="MainMenuLocate">
        <div className="MenuList">
          {this.props.category.map((element, index) => (
            <a href={buildLink(element)} key={index}>
              {element}
            </a>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderMenuList()}
        <div className="ContentBlock">
          <div className="ContentCaption">{getCategory()}</div>
          <div id="CategoryBlock"><CategoryTileGrid /></div>
          <div className="ContentColumn">
            <div id="ArticleBlock">ArticleBlock</div>
          </div>
          <div id="PhotoBlock">PhotoBlock</div>
          <p id="ErrorMessage">Error</p>
        </div>
      </React.Fragment>
    );
  }
}

export { PageContent };
