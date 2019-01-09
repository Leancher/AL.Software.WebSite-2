import React from 'react';
import { getPhotosList } from './utilites';

export class PhotoViewer extends React.Component {
  constructor(props) {
    super(props);
    this.ArrowLEn = './Pictures/Util/ArrowLEn.png';
    this.ArrowREn = './Pictures/Util/ArrowREn.png';
    this.ArrowLDis = './Pictures/Util/ArrowLDis.png';
    this.ArrowRDis = './Pictures/Util/ArrowRDis.png';
    this.closeEn = './Pictures/Util/CloseEn.png';
    this.closeDis = './Pictures/Util/CloseDis.png';
    this.currentPhoto = 0;
  }
  state = {
    isLoading: false,
    mode: 'photoGrid',
    photosList: ''
  };
  renderPhotoGrid() {
    const { catName, subCatNum } = this.props;
    if (this.state.photosList === '') return 'В этом альбоме нет картинок';

    return (
      <div id="Content" className="PhotoPlace">
        {this.state.photosList.map((item, index) => {
          return (
            <div className="PhotoCell" key={index}>
              <img
                id="photo"
                src={'./Pictures/' + catName + '/Album' + subCatNum + 'Preview/' + item}
                alt={item}
                style={{ cursor: 'pointer' }}
                name={index}
              />
            </div>
          );
        })}
      </div>
    );
  }

  loadPhotosList = response => {
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

  buildPhotoLink = () => {
    const { catName, subCatNum } = this.props;
    return (
      './Pictures/' +
      catName +
      '/Album' +
      subCatNum +
      '/' +
      this.state.photosList[this.currentPhoto]
    );
  };
  showNextPhoto(photoPlace) {
    this.currentPhoto += 1;
    if (this.currentPhoto > this.state.photosList.length - 1) {
      this.currentPhoto = this.state.photosList.length - 1;
      return;
    }
    photoPlace.src = this.buildPhotoLink();
  }
  showPrevPhoto(photoPlace) {
    this.currentPhoto -= 1;
    if (this.currentPhoto < 0) {
      this.currentPhoto = 0;
      return;
    }
    photoPlace.src = this.buildPhotoLink();
  }

  clickButton = e => {
    const id = e.target.id;
    if (id === 'BtPrev') {
      this.showPrevPhoto(e.currentTarget.children[1].children[0]);
    }
    if (id === 'BtNext') {
      this.showNextPhoto(e.currentTarget.children[1].children[0]);
    }
    if (id === 'photo') {
      this.currentPhoto = e.target.name;
      this.setState({ mode: 'singlePhoto' });
    }
  };

  renderSinglePhoto() {
    return (
      <React.Fragment>
        <div className="Button">
          <img id="BtPrev" src={this.ArrowLDis} alt="BtPrev" />
        </div>
        <div className="PhotoPlace">
          <img
            id="singlePhoto"
            src={this.buildPhotoLink()}
            alt={this.state.photosList[this.currentPhoto]}
            className="CurrentPhoto"
          />
        </div>
        <div className="Button">
          <img id="" src={this.closeDis} alt="BtNext" />
          <br />
          <img id="BtNext" src={this.ArrowRDis} alt="BtNext" />
        </div>
      </React.Fragment>
    );
  }

  selectMode() {
    if (this.state.mode === 'photoGrid') return this.renderPhotoGrid();

    return this.renderSinglePhoto();
  }

  render() {
    return (
      <div className="ContentBlock">
        <div className="ContentCaption">{this.props.subCatCaption}</div>
        <div
          style={{ display: 'flex' }}
          onMouseMove={this.setEnablePic}
          onMouseOut={this.setDisablePic}
          onClick={this.clickButton}
        >
          {/*           <div className="Button" style={{ display: 'flex' }}>
            <img id="BtPrev" src={this.ArrowLDis} alt="BtPrev" />
          </div> */}

          {this.state.photosList.length === 0
            ? getPhotosList(this.loadPhotosList, this.props.catNum, this.props.subCatNum)
            : this.selectMode()}

          {/*           <div className="Button" style={{ display: 'flex' }}>
            <img id="BtNext" src={this.ArrowRDis} alt="BtNext" />
          </div> */}
        </div>
      </div>
    );
  }
}
