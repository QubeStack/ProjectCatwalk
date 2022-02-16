/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import MultiDisplayCarousel from './MultiDisplayCarousel';

class SimilarItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/products',
    })
      .then((results) => {
        this.setState({
          products: results.data,
        });
      });
  }

  render() {
    return (
      <>
        <div>Similar Items</div>
        <MultiDisplayCarousel render={this.props.render} products={this.state.products} actionButton="+" />
      </>
    );
  }
}

export default SimilarItems;
