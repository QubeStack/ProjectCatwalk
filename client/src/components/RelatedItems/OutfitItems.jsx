/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MultiDisplayCarousel from './MultiDisplayCarousel';

class OutfitItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const outfit = [];
    outfit.push(JSON.parse(localStorage.getItem('myOutfit')));
    this.setState({
      products: outfit,
    });
  }

  render() {
    return (
      <>
        <div>Your Outfit</div>
        <MultiDisplayCarousel products={this.state.products} />
      </>
    );
  }
}

export default OutfitItems;
