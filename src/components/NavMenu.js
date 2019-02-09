import React from 'react';
import { buildLink, getCategoriesList } from './utilites';

export class NavMenu extends React.Component {
  state = {
    isLoading: false,
    categoriesList: []
  };

  renderMenuList() {
    return this.state.categoriesList.map((element, index) => (
      <a href={buildLink(index, 0)} key={index}>
        {element[1]}
      </a>
    ));
  }

  loadData = responseList => {
    this.setState({
      isLoading: true,
      categoriesList: responseList
    });
  };

  render() {
    return (
      <div className="MainMenuLocate">
        <div className="MenuList">
          {this.state.isLoading === false ? getCategoriesList(this.loadData, this.catNum) : this.renderMenuList()}
        </div>
      </div>
    );
  }
}
