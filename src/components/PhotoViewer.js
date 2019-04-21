import React from 'react';
import { getPhotosList, parseQueryString } from './utilites';

export class PhotoViewer extends React.Component {
  constructor(props) {
    super(props);
    this.arrowLEn = './Pictures/Util/arrowLEn.png';
    this.arrowREn = './Pictures/Util/arrowREn.png';
    this.arrowLDis = './Pictures/Util/arrowLDis.png';
    this.arrowRDis = './Pictures/Util/arrowRDis.png';
    this.closeEn = './Pictures/Util/CloseEn.png';
    this.closeDis = './Pictures/Util/CloseDis.png';
    this.currentPhoto = 0;
    this.catName = '';
    this.qsCat = parseQueryString('cat');
    this.qsSubCat = parseQueryString('subCat');
  }
  state = {
    isLoading: false,
    mode: 'photoGrid',
    photosList: ''
  };
  renderPhotoGrid = () => {
    if (this.state.photosList === '') return 'В этом альбоме нет картинок';

    return (
      <div id="Content" className="PhotoPlace">
        {this.state.photosList.map((item, index) => {
          return (
            <div className="PhotoCell" key={index}>
              <img
                id="photo"
                src={'./Pictures/' + this.props.catName + '/Album' + this.qsSubCat + 'Preview/' + item}
                alt={item}
                style={{ cursor: 'pointer' }}
                name={index}
              />
            </div>
          );
        })}
      </div>
    );
  };

  loadPhotosList = response => {
    console.log(response);
    this.setState({ isLoading: true, photosList: response });
    return this.renderPhotoGrid();
  };

  setEnablePic = e => {
    if (e.target.id === 'BtClose') e.target.src = this.closeEn;
    if (e.target.id === 'BtPrev') e.target.src = this.arrowLEn;
    if (e.target.id === 'BtNext') e.target.src = this.arrowREn;
  };

  setDisablePic = e => {
    if (e.target.id === 'BtClose') e.target.src = this.closeDis;
    if (e.target.id === 'BtPrev') e.target.src = this.arrowLDis;
    if (e.target.id === 'BtNext') e.target.src = this.arrowRDis;
  };

  photoLink = () => {
    const link =
      './Pictures/' + this.props.catName + '/Album' + this.qsSubCat + '/' + this.state.photosList[this.currentPhoto];
    return link;
  };
  showNextPhoto(photoPlace) {
    this.currentPhoto = Number(this.currentPhoto) + 1;
    if (this.currentPhoto > this.state.photosList.length - 1) {
      this.currentPhoto = this.state.photosList.length - 1;
      return;
    }
    photoPlace.src = this.photoLink();
  }

  showPrevPhoto(photoPlace) {
    this.currentPhoto -= 1;
    if (this.currentPhoto < 0) {
      this.currentPhoto = 0;
      return;
    }
    photoPlace.src = this.photoLink();
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
    if (id === 'BtClose') {
      this.setState({ mode: 'photoGrid' });
    }
  };

  renderSinglePhoto() {
    return (
      <React.Fragment>
        <div className="BtLeftPlace BtPlace">
          <img id="BtPrev" src={this.arrowLDis} alt="BtPrev" className="BtPrev" />
        </div>
        <div className="PhotoPlace">
          <img
            className="CurrentPhoto"
            id="CurrentPhoto"
            src={this.photoLink()}
            alt={this.state.photosList[this.currentPhoto]}
          />
        </div>
        <div className="BtRightPlace BtPlace">
          <div>
            <img id="BtClose" src={this.closeDis} alt="BtClose" />
          </div>
          <div className="BtNext">
            <img id="BtNext" src={this.arrowRDis} alt="BtNext" />
          </div>
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
      <div
        style={{ display: 'flex' }}
        onMouseMove={this.setEnablePic}
        onMouseOut={this.setDisablePic}
        onClick={this.clickButton}
      >
        {this.state.isLoading === false
          ? getPhotosList(this.loadPhotosList, this.qsCat, this.qsSubCat)
          : this.selectMode()}
      </div>
    );
  }
}
