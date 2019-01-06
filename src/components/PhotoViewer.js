import React from 'react';
import { getPhotosList } from './utilites';

class PhotoViewer extends React.Component {
  constructor(props) {
    super(props);
    this.ArrowLEn = './Pictures/Util/ArrowLEn.png';
    this.ArrowREn = './Pictures/Util/ArrowREn.png';
    this.ArrowLDis = './Pictures/Util/ArrowLDis.png';
    this.ArrowRDis = './Pictures/Util/ArrowRDis.png';
  }
  state = {
    photosList: []
  };
  renderPhotoGrid() {
    return;
  }

  setPhotosList(response) {
    console.log(response);
    this.setState({ photosList: response });
    return this.renderPhotoGrid();
  }

  setEnablePic = e => {
    if (e.target.id === 'BtPrev') e.target.src = this.ArrowLEn;
    if (e.target.id === 'BtNext') e.target.src = this.ArrowREn;
  };

  setDisablePic = e => {
    if (e.target.id === 'BtPrev') e.target.src = this.ArrowLDis;
    if (e.target.id === 'BtNext') e.target.src = this.ArrowRDis;
  };

  clickButton = e => {
    console.log(e.target);
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ display: 'flex' }}
          onMouseMove={this.setEnablePic}
          onMouseOut={this.setDisablePic}
          onClick={this.clickButton}
        >
          <div className="Button">
            <img id="BtPrev" src={this.ArrowLDis} alt="BtPrev" />
          </div>

          <div id="Content" className="PhotoPlace">
            <div>Photoplace</div>
            {this.state.photosList.length === 0
              ? getPhotosList(
                  this.setPhotosList,
                  this.props.numberCat,
                  this.props.numSubCat
                )
              : this.renderPhotoGrid()}
          </div>

          <div className="Button">
            <img id="BtNext" src={this.ArrowRDis} alt="BtNext" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { PhotoViewer };
