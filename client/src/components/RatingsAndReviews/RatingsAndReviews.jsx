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
      <Div>
        <ReviewsList reviews={this.state.reviews} />
      </Div>

    );
  }
}

export default RatingsAndReviews;
