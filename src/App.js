import React from "react";
import "webpack-runtime-require";
//import ReactDOM from "react-dom";
import "./App.css";
import { PageMain } from "./components/PageMain";
import { PageContent } from "./components/PageContent";
import { config, getCategory } from "./components/utilites";

class App extends React.Component {
  state = {
    categories: [
      "Main",
      "MyProjects",
      "RepairCar",
      "MyPhoto",
      "ThingUSSR",
      "Thing90",
      "HistCher",
      "MyNotes"
    ]
  };
  handleAddNews = data => {
    //const nextNews = [data, ...this.state.news];
    //this.setState({ news: nextNews });
  };
  componentDidMount() {
    /*     this.setState({isLoading: true})
    fetch('http://localhost:3000/data/newsData.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setTimeout(() => { // добавили задержку
        this.setState({ isLoading: false, news: data })
        }, 1000)
    }) */
  }

  selectRenderPage() {
    if (getCategory() === "Main") {
      return <PageMain category={this.state.categories} />;
    }
    return <PageContent category={this.state.categories} />;
  }

  renderHeader() {
    return (
      <div className="header">
        <div className="HeaderTitle">
          <a href={config.defaultPage}>
            <img src={"./Pictures/Logo/" + getCategory() + ".png"} alt="alt" />
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
  connectDB(){
    const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database('./Database.db', (err) => {
      if (err) {
        console.error('Error open: ' + err.message);
      }
      console.log('Connected to my database.');
    });
    db.close((err) => {
      if (err) {
        console.error('Error close: ' + err.message);
      }
      console.log('Close the database connection.');
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.renderHeader()}
        <div className="Body">
          {this.selectRenderPage()}
        </div>
        {this.connectDB()}
        {/*         <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) ? <News data = {news} /> : <p>Нет новостей</p>} */}
      </React.Fragment>
    );
  }
}

export default App;
