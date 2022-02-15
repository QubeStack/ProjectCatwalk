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
    const newOutfit = JSON.parse(localStorage.getItem('myOutfit'));
    outfit.push(JSON.parse(localStorage.getItem('myOutfit')));
    if (newOutfit !== null) {
      this.setState({
        products: outfit,
      });
    }
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
