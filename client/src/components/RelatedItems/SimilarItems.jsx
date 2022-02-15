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
        console.log(results.data);
        this.setState({
          products: results.data,
        });
      });
  }

  render() {
    return (
      <>
        <div>Similar Items</div>
        <MultiDisplayCarousel products={this.state.products} />
      </>
    );
  }
}

export default SimilarItems;
