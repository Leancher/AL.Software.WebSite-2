import React from 'react';
import './App.css';
import { HomePage } from './components/HomePage';
import { ContentPage } from './components/ContentPage';
import { parseQueryString } from './components/utilites';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.catNum = parseQueryString('cat');
  }

  render() {
    return (
      <React.Fragment>
        {/* Номер категории 0, показываем главную страницу */}
        {Number(this.catNum) === 0 ? <HomePage /> : <ContentPage />}
      </React.Fragment>
    );
  }
}
