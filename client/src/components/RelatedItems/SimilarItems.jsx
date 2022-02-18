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
      url: '/api/product/related',
      params: {
        product_id: this.props.id,
      },
    })
      .then((results) => {
        Promise.all(results.data.map((result) => (
          axios({
            method: 'get',
            url: '/api/product',
            params: {
              product_id: result,
            },
          })
        )))
          .then((products) => {
            const data = products.map((product) => product.data);
            this.setState({
              products: data,
            });
          });
      });
  }

  render() {
    return (
      <>
        <div>Similar Items</div>
        <MultiDisplayCarousel id={this.props.id} render={this.props.render} products={this.state.products} actionButton="+" offset={0} />
      </>
    );
  }
}

export default SimilarItems;
