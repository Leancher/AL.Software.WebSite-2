import React from 'react';
import { config, buildLink, getCategoriesList } from './utilites';
const { caption } = config;

export class NavMenu extends React.Component {
  state = {
    isLoading: false,
    categoriesList: []
  };

  renderMenuList() {
    return this.state.categoriesList.map((element, index) => {
      if (index === 8) return '';
      return (
        <a className="col-xl" href={buildLink(index, 0)} key={index}>
          {element[caption]}
        </a>
      );
    });
  }

  loadData = responseList => {
    this.setState({
      isLoading: true,
      categoriesList: responseList
    });
  };

  render() {
    return (
      <div className="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-3 mt-xl-0 mt-lg-3 mt-md-3 mt-sm-3 mt-3 MenuList">
        <div className="row">
          {this.state.isLoading === false ? getCategoriesList(this.loadData, this.catNum) : this.renderMenuList()}
        </div>
      </div>
    );
  }
}
