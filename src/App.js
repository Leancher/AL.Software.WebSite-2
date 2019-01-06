import React from 'react';
//import ReactDOM from "react-dom";
import './App.css';
import { PageMain } from './components/PageMain';
import { PageContent } from './components/PageContent';
import {
  config,
  getCategoryNumber,
  getCategoryList,
  getSubCatNumber
} from './components/utilites';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.numCat = 0;
  }
  state = {
    categories: []
  };

  selectRenderPage() {
    if (Number(this.numCat) === 0) {
      return <PageMain category={this.state.categories} />;
    }
    return <PageContent category={this.state.categories} />;
  }

  renderHeader() {
    const { categories } = this.state;
    return (
      <div className="header">
        <div className="HeaderTitle">
          <a href={config.defaultPage}>
            <img
              src={'./Pictures/Logo/' + categories[this.numCat][0] + '.png'}
              alt="alt"
            />
            LEANCHER
          </a>
        </div>
        <div className="HeaderMenu">
          <a href="#linkStat" className="HeaderMenuItem">
            Статистика
          </a>
          <br />
          <a href="#linkAbout" className="HeaderMenuItem">
            О сайте
          </a>
        </div>
      </div>
    );
  }

  renderPage() {
    this.numCat = getCategoryNumber();
    getSubCatNumber();
    return (
      <React.Fragment>
        {this.renderHeader()}
        <div className="Body">{this.selectRenderPage()}</div>
      </React.Fragment>
    );
  }

  setCatsList = catsList => {
    this.setState({ categories: catsList });
    return this.renderPage();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.categories.length === 0
          ? getCategoryList(this.setCatsList)
          : this.renderPage()}
      </React.Fragment>
    );
  }
}

export default App;
