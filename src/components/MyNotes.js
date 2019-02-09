import React from 'react';
import { getNotesPreview, getSingleNote } from './utilites';

export class MyNotes extends React.Component {
  constructor(props) {
    super(props);
    this.curNoteNum = 0;
    this.curCapNote = '';
  }
  state = {
    mode: 'notesPreview',
    isLoading: false,
    notesList: '',
    curNote: ''
  };

  loadSingleNote = response => {
    this.setState({ isLoading: true, curNote: response });
  };

  renderSingleNote() {
    if (this.state.isLoading === false) return getSingleNote(this.loadSingleNote, this.curNoteNum);
    return (
      <React.Fragment>
        <h3>{this.curCapNote}</h3>
        <p>{this.state.curNote}</p>
      </React.Fragment>
    );
  }

  loadNotesPreviewList = response => {
    this.setState({ isLoading: true, notesList: response });
  };

  renderNotesPreview() {
    if (this.state.isLoading === false) return getNotesPreview(this.loadNotesPreviewList);
    return this.state.notesList.map((item, index) => {
      if (index === 0) return '';
      return (
        <div key={index}>
          {
            <p>
              <b>{item[0]}</b>
            </p>
          }
          {item[1] + '...'}
          &nbsp;&nbsp;&nbsp;
          <label id={index} className="TextLink" style={{ cursor: 'pointer' }} onClick={this.clickButton}>
            Показать полностью
          </label>
        </div>
      );
    });
  }

  clickButton = e => {
    this.curNoteNum = e.target.id;
    this.curCapNote = this.state.notesList[this.curNoteNum][0];
    this.setState({ mode: 'singleNote', isLoading: false });
  };

  selectMode() {
    if (this.state.mode === 'notesPreview') return this.renderNotesPreview();
    return this.renderSingleNote();
  }

  render() {
    return <div className="ContentColumn">{this.selectMode()}</div>;
  }
}
