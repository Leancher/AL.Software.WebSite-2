import React from 'react';
import { getCountView } from './utilites';

export class Statistics extends React.Component {
  state = {
    isLoading: false,
    listCountView: []
  };

  renderStatistics() {
    return <React.Fragment>Statistics</React.Fragment>;
  }

  loadData = responseList => {
    console.log(responseList);
    this.setState({
      isLoading: true,
      listCountView: [...responseList]
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isLoading === false ? getCountView(this.loadData) : this.renderStatistics()}
      </React.Fragment>
    );
  }
}
