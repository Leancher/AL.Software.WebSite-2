import React from 'react';
//import ReactDOM from "react-dom";
import './App.css';
import { PageMain } from './components/PageMain';
import { NavMenu } from './components/NavMenu';
import { Header } from './components/Header';
import { CurrentCategory } from './components/CurrentCategory';
import {
  getCategoryNumber,
  getCategoriesList,
  getSubCatNumber,
  getsubCategoriesList
} from './components/utilites';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.catName = 0;
    this.catNum = 0;
    this.subCatNum = 0;
  }
  state = {
    categoriesList: [],
    subCategoriesList: []
  };

  selectContent() {
    if (Number(this.catNum) === 0) {
      return <PageMain categoriesList={this.state.categoriesList} />;
    }
    if (Number(this.catNum) > 0) {
      return (
        <React.Fragment>
          <NavMenu category={this.state.categoriesList} />
          <CurrentCategory
            subCategories={this.state.subCategoriesList}
            category={this.state.categoriesList[this.catNum]}
            catNum={this.catNum}
          />
        </React.Fragment>
      );
    }
    if (Number(this.subCatNum) === 0) {
    }

    //return <PageContent category={this.state.categoriesList} />;
  }

  renderMainContainer() {
    this.catName = this.state.categoriesList[this.catNum][0];
    return (
      <React.Fragment>
        <Header catName={this.catName} />
        <div className="Body">{this.selectContent()}</div>
      </React.Fragment>
    );
  }

  setCatsList = categoriesList => this.setState({ categoriesList: [...categoriesList] });

  setSubCatsList = subCategoriesList =>
    this.setState({ subCategoriesList: [...subCategoriesList] });

  requestData() {
    if (this.state.categoriesList.length === 0) {
      getCategoriesList(this.setCatsList);
    }
    if (this.subCatNum === 0) return;
    if (this.state.subCategoriesList.length === 0) {
      getsubCategoriesList(this.setSubCatsList, this.subCatNum);
    }
  }

  render() {
    this.catNum = getCategoryNumber();
    this.subCatNum = getSubCatNumber();
    const len1 = this.state.categoriesList.length;
    //const len2 = this.state.subCategoriesList.length;
    return (
      <React.Fragment>
        {len1 > 0 ? this.renderMainContainer() : this.requestData()}
      </React.Fragment>
    );
  }
}
