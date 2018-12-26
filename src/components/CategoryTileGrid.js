import React from "react";

class CategoryTileGrid extends React.Component {

  renderTileGrid() {
    const tileGrid = [];
    for (let i = 0; i < 10; i += 1) {
        tileGrid.push(
            <div className='TileCell'> 
                <a href='#subCat'>
                <div className='TileCellPic'>
                    <img src='./Pictures/Noimage.jpg' alt='image' />
                </div>
                <div className='TileCellCaption'>
                {'Caption ' + i}
                </div>
                </a>
            </div>
        )
    }     
    return tileGrid;     
  }
  render() {
    return <React.Fragment>{this.renderTileGrid()}</React.Fragment>;
  }
}

export { CategoryTileGrid };
