import React from 'react';
//import ReactDOM from "react-dom";
import './App.css';
import { HomePage } from './components/HomePage';
import { NavMenu } from './components/NavMenu';
import { Header } from './components/Header';
import { CurrentCategory } from './components/CurrentCategory';
import { PhotoViewer } from './components/PhotoViewer';
import { Article } from './components/Article';
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

  setHeadTags(description) {
    const namePage = this.state.categoriesList[this.catNum][caption];
    document.title = namePage + ' - ' + siteName;
    document.getElementsByTagName('META')[2].content = description;
  }

  setContent() {
    this.catName = this.state.categoriesList[this.catNum][name];
    // Если передан номер подкатегории, то показываем подкатегорию
    if (Number(this.subCatNum) > 0) {
      this.setHeadTags(this.state.subCategoriesList[this.subCatNum][description]);
      //Подкатегория является фотоальбомом
      if (this.state.subCategoriesList[this.subCatNum][isPhotoAlbum] === '1') {
        return <PhotoViewer catName={this.catName} />;
      }
      if (this.state.subCategoriesList[this.subCatNum][isArticle] === '1') {
        return <Article catName={this.catName} />;
      }
    }
    // Номер категории больше 0, показываем список подкатегорий этой категории
    if (Number(this.catNum) > 0) {
      if (this.state.categoriesList[this.catNum][isTileGrid] === '1') {
        return <CurrentCategory subCategories={this.state.subCategoriesList} />;
      }
    }
  }

  setCaption() {
    if (Number(this.subCatNum) > 0) return this.state.subCategoriesList[this.subCatNum][caption];
    if (Number(this.catNum) > 0) return this.state.categoriesList[this.catNum][caption];
  }

  renderContentPage() {
    return (
      <React.Fragment>
        <NavMenu category={this.state.categoriesList} />
        <div className="ContentBlock">
          <div className="ContentCaption">{this.setCaption()}</div>
          {this.setContent()}
        </div>
      </React.Fragment>
    );
  }

  renderHomePage = () => <HomePage categoriesList={this.state.categoriesList} />;

  renderMain() {
    this.catName = this.state.categoriesList[this.catNum][name];
    this.setHeadTags(this.state.categoriesList[this.catNum][description]);
    return (
      <React.Fragment>
        <Header catName={this.catName} />
        {/* Номер категории 0, показываем главную страницу */}
        <div className="Body">{Number(this.catNum) === 0 ? this.renderHomePage() : this.renderContentPage()}</div>
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
        {this.state.isLoading === false ? requestData(this.loadData, this.catNum) : this.renderMain()}
      </React.Fragment>
    );
  }
}
