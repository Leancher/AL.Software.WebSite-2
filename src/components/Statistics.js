import React from 'react';
import { config, buildLink, getCountView } from './utilites';

const { name, caption, viewed } = config;

export class Statistics extends React.Component {
  state = {
    isLoading: false,
    listCountView: []
  };

  statListProcess() {
    console.log(this.state.listCountView);
    return this.state.listCountView
      .filter((item, index) => {
        if (item.length === 1) return false;
        if (item[viewed] < 10) return false;
        return true;
      })
      .sort((a, b) => b[viewed] - a[viewed])
      .map((item, index) => {
        return (
          <React.Fragment key={index}>
            <a href={buildLink(item[name])}>{item[caption]}</a> - {item[viewed]}
            <br />
          </React.Fragment>
        );
      });
  }

  loadData = responseList => {
    this.setState({
      isLoading: true,
      listCountView: responseList
    });
  };

  renderStatisticsList() {
    const resultList = this.statListProcess();
    const len = resultList.length;
    return (
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '50%' }}>{resultList.slice(0, len / 2)}</td>
            <td style={{ width: '50%' }}>{resultList.slice(len / 2)}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading === false ? getCountView(this.loadData, this.catNum) : this.renderStatisticsList()}
      </React.Fragment>
    );
  }
}
