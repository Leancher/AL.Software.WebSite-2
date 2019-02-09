import React from 'react';
import { buildLink, getCategoriesList } from './utilites';
import { Header } from './Header';
import { headTags } from './HeadTags';

// const { siteName, name, caption, description, isPhotoAlbum, isTileGrid, isArticle } = config;

export class HomePage extends React.Component {
  state = {
    isLoading: false,
    categoriesList: []
  };

  renderCategoryGrid() {
    headTags();
    return this.state.categoriesList.map((element, index) => {
      if (index === 0) return '';
      return (
        <div key={index} className="TileCell">
          <a href={buildLink(index, 0)}>
            <div className="TileCellPic">
              <img src={'./Pictures/Main/' + element[0] + '.png'} alt="alt" />
            </div>
            <div className="TileCellCaption">{element[1]}</div>
          </a>
        </div>
      );
    });
  }

  loadData = responseList => {
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
