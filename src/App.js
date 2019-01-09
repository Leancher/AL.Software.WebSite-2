import React from 'react';
//import ReactDOM from "react-dom";
import './App.css';
import { PageMain } from './components/PageMain';
import { NavMenu } from './components/NavMenu';
import { Header } from './components/Header';
import { CurrentCategory } from './components/CurrentCategory';
import { PhotoViewer } from './components/PhotoViewer';
import { requestData, getCategoryNumber, getSubCatNumber } from './components/utilites';

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
    if (Number(this.catNum) === 0) {
      return <PageMain categoriesList={this.state.categoriesList} />;
    }
    if (Number(this.subCatNum) > 0) {
      return (
        <React.Fragment>
          <NavMenu category={this.state.categoriesList} />
          <PhotoViewer
            catNum={this.catNum}
            subCatNum={this.subCatNum}
            catName={this.state.categoriesList[this.catNum][0]}
            subCatCaption={this.state.subCategoriesList[this.subCatNum - 1][0]}
          />
        </React.Fragment>
      );
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
        {this.state.isLoading === false
          ? requestData(this.loadData, this.catNum)
          : this.renderMainContainer()}
      </React.Fragment>
    );
  }
}
