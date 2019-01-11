import React from 'react';
//import ReactDOM from "react-dom";
import './App.css';
import { PageMain } from './components/PageMain';
import { NavMenu } from './components/NavMenu';
import { Header } from './components/Header';
import { CurrentCategory } from './components/CurrentCategory';
import { PhotoViewer } from './components/PhotoViewer';
import { config, requestData, getCategoryNumber, getSubCatNumber } from './components/utilites';

const { siteName, name, caption, description, isPhotoAlbum, isTileGrid, isArticle } = config;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.catName = 0;
    this.catNum = 0;
    this.subCatNum = 0;
  }
  state = {
    isLoading: false,
    categoriesList: [],
    subCategoriesList: []
  };

  selectContent() {
    this.setHeadTags(this.state.categoriesList[this.catNum][description]);
    //Номер категории 0, показываем главную страницу
    if (Number(this.catNum) === 0) {
      return <PageMain categoriesList={this.state.categoriesList} />;
    }
    // Если передан номер подкатегории, то показываем подкатегорию
    if (Number(this.subCatNum) > 0) {
      this.setHeadTags(this.state.subCategoriesList[this.subCatNum - 1][description]);
      //Подкатегория является фотоальбомом
      if (this.state.subCategoriesList[this.subCatNum - 1][isPhotoAlbum] === '1') {
        return (
          <React.Fragment>
            <NavMenu category={this.state.categoriesList} />
            <PhotoViewer
              catNum={this.catNum}
              subCatNum={this.subCatNum}
              catName={this.state.categoriesList[this.catNum][name]}
              subCatCaption={this.state.subCategoriesList[this.subCatNum - 1][caption]}
            />
          </React.Fragment>
        );
      }
    }
    // Номер категории больше 0, показываем список подкатегорий это категории
    if (Number(this.catNum) > 0) {
      if (this.state.categoriesList[this.catNum][isTileGrid] === '1') {
        return (
          <React.Fragment>
            <NavMenu category={this.state.categoriesList} />
            <CurrentCategory
              subCategories={this.state.subCategoriesList}
              captionCat={this.state.categoriesList[this.catNum][caption]}
              catNum={this.catNum}
            />
          </React.Fragment>
        );
      }
    }
  }

  setHeadTags(description) {
    const namePage = this.state.categoriesList[this.catNum][caption];
    document.title = namePage + ' - ' + siteName;
    document.getElementsByTagName('META')[2].content = description;
  }

  renderMainContainer() {
    this.catName = this.state.categoriesList[this.catNum][name];
    return (
      <React.Fragment>
        <Header catName={this.catName} />
        <div className="Body">{this.selectContent()}</div>
      </React.Fragment>
    );
  }

  loadData = responseList => {
    this.setState({
      isLoading: true,
      categoriesList: [...responseList[0]],
      subCategoriesList: [...responseList[1]]
    });
  };

  render() {
    this.catNum = getCategoryNumber();
    this.subCatNum = getSubCatNumber();
    return (
      <React.Fragment>
        {this.state.isLoading === false ? requestData(this.loadData, this.catNum) : this.renderMainContainer()}
      </React.Fragment>
    );
  }
}
