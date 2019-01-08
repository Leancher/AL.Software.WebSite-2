import React from 'react';
import { getPhotosList } from './utilites';

export class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.ArrowLEn = './Pictures/Util/ArrowLEn.png';
    this.ArrowREn = './Pictures/Util/ArrowREn.png';
    this.ArrowLDis = './Pictures/Util/ArrowLDis.png';
    this.ArrowRDis = './Pictures/Util/ArrowRDis.png';
  }
  state = {
    photosList: ''
  };
  renderPhotoGrid() {
    const { nameCat, numSubCat } = this.props;
    if (this.state.photosList === '') return 'В этом альбоме нет картинок';

    return this.state.photosList.map((item, index) => {
      return (
        <div className="PhotoCell" key={index}>
          <img
            id="photo"
            src={'./Pictures/' + nameCat + '/Album' + numSubCat + 'Preview/' + item}
            alt={item}
            style={{ cursor: 'pointer' }}
            name={item}
          />
        </div>
      );
    });
  }

  setPhotosList = response => {
    this.setState({ photosList: response });
    return this.renderPhotoGrid();
  };

  setEnablePic = e => {
    if (e.target.id === 'BtPrev') e.target.src = this.ArrowLEn;
    if (e.target.id === 'BtNext') e.target.src = this.ArrowREn;
  };

  setDisablePic = e => {
    if (e.target.id === 'BtPrev') e.target.src = this.ArrowLDis;
    if (e.target.id === 'BtNext') e.target.src = this.ArrowRDis;
  };

  clickButton = e => {
    //const id = e.target.id;
    if (e.target.id === 'BtPrev') console.log(e.target);
    if (e.target.id === 'BtNext') console.log(e.target);
    if (e.target.id === 'photo') console.log(e.target.name);
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
          {/*           <div className="Button" style={{ display: 'flex' }}>
            <img id="BtPrev" src={this.ArrowLDis} alt="BtPrev" />
          </div> */}

          <div id="Content" className="PhotoPlace">
            {this.state.photosList.length === 0
              ? getPhotosList(
                  this.setPhotosList,
                  this.props.numberCat,
                  this.props.numSubCat
                )
              : this.renderPhotoGrid()}
          </div>

          {/*           <div className="Button" style={{ display: 'flex' }}>
            <img id="BtNext" src={this.ArrowRDis} alt="BtNext" />
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
