import React from 'react';
import { buildLink } from './utilites';

const catName = 0;
const caption = 1;
const subCatName = 2;
const countView = 3;

export class Statistics extends React.Component {
  state = {
    isLoading: false,
    listCountView: []
  };

  statListProcess() {
    console.log(this.props.statList);
    return this.props.statList
      .filter((item, index) => {
        if (index === 0) return false;
        if (item.length === 1) return false;
        if (item[countView] < 10) return false;
        return true;
      })
      .sort((a, b) => b[countView] - a[countView])
      .map((item, index) => {
        return (
          <React.Fragment key={index}>
            <a href={buildLink(item[catName], item[subCatName])}>{item[caption]}</a> - {item[countView]}
            <br />
          </React.Fragment>
        );
      });
  }

  render() {
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
}
