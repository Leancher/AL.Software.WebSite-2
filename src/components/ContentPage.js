import React from 'react';
import { config, getCurrentCategory, getCategoryNumber, getSubCatNumber } from './utilites';
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
    this.catNum = getCategoryNumber();
    this.catName = 0;
    this.catCaption = 0;
    this.catDesc = 0;
    this.catIsTileGrid = 0;
    this.subCatNum = getSubCatNumber();
  }
  state = {
    isLoading: false,
    curCategory: []
  };

  setContent() {
    const subCategory = this.state.curCategory[this.subCatNum];

    const components = [];
    // Если номер подкатегории не равен 0, то показываем подкатегорию
    if (Number(this.subCatNum) > 0) {
      headTags(this.catCaption, subCategory[description]);
      //Подкатегория или ее часть является статьей
      if (subCategory[isArticle] === '1') {
        components.push(<Article catName={this.catName} key={0} />);
      }
      //Подкатегория является фотоальбомом
      if (subCategory[isPhotoAlbum] === '1') {
        components.push(<PhotoViewer catName={this.catName} key={1} />);
      }
    }
    // Номер категории больше 0 и нет подкатегории, показываем список подкатегорий этой категории
    if (Number(this.catNum) !== 0 && Number(this.subCatNum) === 0) {
      console.log(this.catNum);
      if (this.catNum === 'statistics') components.push(<Statistics key={this.catNum} />);
      if (this.catIsTileGrid === '1') {
        components.push(
          <CurrentCategory subCategory={this.state.curCategory} catNum={this.catNum} key={this.catNum} />
        );
      }
      //Категория "Заметки"
      if (Number(this.catNum) === 7) {
        components.push(<MyNotes key={7} />);
      }
    }
    return components;
  }

  setCaption() {
    if (Number(this.subCatNum) > 0) return this.state.curCategory[this.subCatNum][caption];
    if (Number(this.catNum) > 0) return this.state.curCategory[0][caption];
  }

  setCatProp() {
    const catProp = this.state.curCategory[0];
    this.catName = catProp[name];
    this.catCaption = catProp[caption];
    this.catDesc = catProp[description];
    this.catIsTileGrid = catProp[isTileGrid];
  }

  renderContentPage() {
    this.setCatProp();
    headTags(this.catCaption, this.catDesc);
    return (
      <React.Fragment>
        <Header catName={this.catName} />
        <NavMenu />
        <div className="ContentBlock">
          <div className="ContentCaption">{this.setCaption()}</div>
          {this.setContent()}
        </div>
      </React.Fragment>
    );
  }

  loadData = responseList => {
    this.setState({
      isLoading: true,
      curCategory: [...responseList]
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading === false ? getCurrentCategory(this.loadData, this.catNum) : this.renderContentPage()}
      </React.Fragment>
    );
  }
}
