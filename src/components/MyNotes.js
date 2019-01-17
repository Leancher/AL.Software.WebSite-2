import React from 'react';
import { getNotesPreview } from './utilites';

export class MyNotes extends React.Component {
  state = {
    isLoading: false,
    notesList: ''
  };
  renderNotesPreview() {
    console.log(this.state.notesList);
  }

  loadNotesPreviewList = response => {
    this.setState({ isLoading: true, notesList: response });
    return this.renderPhotoGrid();
  };
  render() {
    return (
      <div className="ContentColumn">
        {this.state.isLoading === false
          ? getNotesPreview(this.loadNotesPreviewList, this.catNum, this.subCatNum)
          : this.renderNotesPreview()}
      </div>
    );
  }
}
