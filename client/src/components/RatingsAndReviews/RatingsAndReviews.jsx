import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewsList from './ReviewsList';

const Div = styled.div`
border-style: solid;
border-color: white;
padding: 1px;
`;

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      slice: 2,
    };
  }

  componentDidMount() {
    const { id } = 40355;
    axios({
      method: 'get',
      url: '/api/product/reviews',
      params: { product_id: 40355 },
    })
      .then((results) => {
        this.setState({ reviews: results.data.results });
      });
  }

  render() {
    return (
      <>
        <Div>
          <ReviewsList reviews={this.state.reviews.slice(0, this.state.slice)} />
        </Div>
        <Div>
          <button type="button" onClick={() => this.setState({slice: this.state.slice + 2})}>
            See More Reviews
          </button>
        </Div>
      </>
    );
  }
}

export default RatingsAndReviews;
