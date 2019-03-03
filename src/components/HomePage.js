import React from 'react';
import { config, buildLink, getCategoriesList } from './utilites';
import { Header } from './Header';
import { headTags } from './HeadTags';

const { name, caption, description } = config;

export class HomePage extends React.Component {
  state = {
    isLoading: false,
    categoriesList: []
  };

  renderCategoryGrid() {
    const categoriesList = this.state.categoriesList;
    headTags(categoriesList[0][caption], categoriesList[0][description]);
    return categoriesList.map((element, index) => {
      //Не показывать: 0 - главная, страница, 8 - статистика
      if (index === 0 || index === 8) return '';
      return (
        <div key={index} className="TileCell">
          <a href={buildLink(index, 0)}>
            <div className="TileCellPic">
              <img src={'./Pictures/Main/' + element[name] + '.png'} alt="alt" />
            </div>
            <div className="TileCellCaption">{element[caption]}</div>
          </a>
        </div>
      );
    });
  }

  loadData = responseList => {
    console.log(responseList);
    this.setState({
      isLoading: true,
      categoriesList: [...responseList]
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <img src="./Pictures/Main/background.jpg" alt="background" width="100%" />
        <div className="TileGrid">
          {this.state.isLoading === false ? getCategoriesList(this.loadData) : this.renderCategoryGrid()}
        </div>
      </React.Fragment>
    );
  }
}
