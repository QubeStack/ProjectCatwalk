/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MultiDisplayCarousel from './MultiDisplayCarousel';

class OutfitItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div>Your Outfit</div>
        <MultiDisplayCarousel id={this.props.id} render={this.props.render} update={this.props.update} products={this.props.products} actionButton="x" addCard offset={1} />
      </>
    );
  }
}

export default OutfitItems;
