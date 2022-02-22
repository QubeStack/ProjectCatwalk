/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import MultiDisplayCarousel from './MultiDisplayCarousel';

class OutfitItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="outfitItems">
        <Label>Your Outfit</Label>
        <MultiDisplayCarousel key={this.props.products} id={this.props.id} render={this.props.render} update={this.props.update} products={this.props.products} actionButton="x" addCard offset={1} />
      </div>
    );
  }
}

const Label = styled.div`
  margin: 0 35px;
`;

export default OutfitItems;
