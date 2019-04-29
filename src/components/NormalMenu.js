import React from 'react';
import { config, buildLink, getCategoriesList } from './utilites';
const { caption } = config;

export class NormalMenu extends React.Component {
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
      <React.Fragment>
        {this.state.isLoading === false ? getCategoriesList(this.loadData, this.catNum) : this.renderMenuList()}
      </React.Fragment>
    );
  }
}
