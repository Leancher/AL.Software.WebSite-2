import React from 'react';
import { config, getCurrentCategory, parseQueryString } from './utilites';
import { NavMenu } from './NavMenu';
import { Header } from './Header';
import { headTags } from './HeadTags';
import { CurrentCategory } from './CurrentCategory';
import { PhotoViewer } from './PhotoViewer';
import { Article } from './Article';
import { MyNotes } from './MyNotes';
import { Statistics } from './Statistics';
const { name, caption, description, isPhotoAlbum, isTileGrid, isArticle } = config;

export class ContentPage extends React.Component {
  constructor(props) {
    super(props);
    //this.queryString = parseQueryString();
    this.qsCat = parseQueryString('cat');
    this.qsSubCat = parseQueryString('subCat');
    this.catName = 0;
    this.catCaption = 0;
    this.title = 0;
    this.catDesc = 0;
    this.catIsTileGrid = 0;
    this.catIsPhotoAlbum = 0;
    this.catIsArticle = 0;
  }
  state = {
    isLoading: false,
    curCategory: []
  };

  setContent() {
    const components = [];
    // Если номер подкатегории не равен 0, то показываем подкатегорию
    if (Number(this.qsSubCat) > 0) {
      //headTags(this.catCaption, subCategory[description]);
      //Подкатегория или ее часть является статьей
      if (this.catIsTileGrid === '1') {
        components.push(<Article catName={this.catName} key={0} />);
      }
      //Подкатегория является фотоальбомом
      if (this.isPhotoAlbum === '1') {
        components.push(<PhotoViewer catName={this.catName} key={1} />);
      }
    }
    // Номер категории больше 0 и нет подкатегории, показываем список подкатегорий этой категории
    if (Number(this.qsCat) !== 0 && Number(this.qsSubCat) === 0) {
      console.log(this.catNum);
      if (this.catNum === 'statistics') components.push(<Statistics key={this.catNum} />);
      if (this.catIsTileGrid === '1') {
        components.push(<CurrentCategory subCategory={this.state.curCategory} catNum={this.catNum} key={this.qsCat} />);
      }
      //Категория "Заметки"
      if (Number(this.catNum) === 7) {
        components.push(<MyNotes key={7} />);
      }
    }
    return components;
  }

  setCatProp() {
    const catProp = this.state.curCategory[0];
    this.catName = catProp[name];
    this.title = catProp[caption];
    this.catCaption = catProp[caption];
    this.catDesc = catProp[description];
    this.catIsTileGrid = catProp[isTileGrid];
  }

  setSubCatProp() {
    const subCatProp = this.state.curCategory[this.queryString['subCat']];
    //Общие свойства: catName, title
    this.catCaption = subCatProp[caption];
    this.catDesc = subCatProp[description];
    this.catIsTileGrid = subCatProp[isTileGrid];
    this.isPhotoAlbum = subCatProp[isPhotoAlbum];
    this.catIsArticle = subCatProp[isArticle];
  }

  renderContentPage() {
    //Сначала считаем, что передали только категорию, устанавливаем свойства категории
    this.setCatProp();
    //Если передана подкатегория, устанавливаем ее свойства
    if (Number(this.qsSubCat) > 0) this.setSubCatProp();
    headTags(this.title, this.catDesc);
    console.log(this);
    return (
      <React.Fragment>
        <Header catName={this.catName} />
        <NavMenu />
        <div className="ContentBlock">
          <div className="ContentCaption">{this.catCaption}</div>
          {this.setContent()}
        </div>
      </React.Fragment>
    );
  }

  loadData = responseList => {
    console.log(responseList);
    this.setState({
      isLoading: true,
      curCategory: [...responseList]
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading === false ? getCurrentCategory(this.loadData, this.qsCat) : this.renderContentPage()}
      </React.Fragment>
    );
  }
}