/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MultiDisplayCarousel from './MultiDisplayCarousel';

class OutfitItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const outfit = [];
    const newOutfit = JSON.parse(localStorage.getItem('myOutfit'));
    outfit.push(JSON.parse(localStorage.getItem('myOutfit')));
    if (newOutfit !== null) {
      this.setState({
        products: newOutfit,
      });
    }
  }

  render() {
    return (
      <>
        <div>Your Outfit</div>
        <MultiDisplayCarousel render={this.props.render} update={this.props.update} products={this.state.products} actionButton="x" />
      </>
    );
  }
}

export default OutfitItems;
