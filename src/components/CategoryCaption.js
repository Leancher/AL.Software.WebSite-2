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
        <div class="row">
          <div class="col-2">
            <button class="btn hideDropMenu btnMenu" type="button" data-toggle="dropdown">
              <img src="./Pictures/Util/menu.png" alt="menu" />
            </button>
            <div class="dropdown-menu">
              <div class="MenuList">{this.renderDropdownMenu()}</div>
            </div>
          </div>
          <div class="col-10">{this.props.catCaption}</div>
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
