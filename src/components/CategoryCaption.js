import React from 'react';
import { config, buildLink, getCategoriesList } from './utilites';
const { caption } = config;

export class CategoryCaption extends React.Component {
  state = {
    isLoading: false,
    categoriesList: []
  };

  renderDropdownMenu() {
    return this.state.categoriesList.map((element, index) => {
      if (index === 8) return '';
      return (
        <a href={buildLink(index, 0)} key={index}>
          {element[caption]}
        </a>
      );
    });
  }

  renderCatCaption() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <button className="btn hideDropMenu btnMenu" type="button" data-toggle="dropdown">
              <img src="./Pictures/Util/menu.png" alt="menu" />
            </button>
            <div className="dropdown-menu">
              <div className="MenuList">{this.renderDropdownMenu()}</div>
            </div>
          </div>
          <div className="col-10">{this.props.catCaption}</div>
        </div>
      </React.Fragment>
    );
  }

  loadData = responseList => {
    this.setState({
      isLoading: true,
      categoriesList: responseList
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading === false ? getCategoriesList(this.loadData, this.catNum) : this.renderCatCaption()}
      </React.Fragment>
    );
  }
}
