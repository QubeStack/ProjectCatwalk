import React from 'react';
import styled from 'styled-components';
import data from './dummy_data';
import ReviewItem from './ReviewItem';

const axios = require('axios');

const Div = styled.div`
padding: 3px;
margin: 4px;
`;

// border-style: solid;
// border-color: #1f513f;

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  // componentDidMount() {
  //   var propReviews = this.props.reviews;
  //   console.log("reviews:", this.props.reviews)
  //   this.setState({ reviews: propReviews });
  //   console.log("state reviews", this.state.reviews)
  // }

  render() {
    return (
      <div className="reviewsList">
        {this.props.reviews.map(
          (review) => (
            <Div>
              <ReviewItem
                summary={review.summary}
                username={review.reviewer_name}
                date={review.date}
                body={review.body}
                recommend={review.recommend}
                response={review.response}
                photos={review.photos}
                rating={review.rating}
              />
            </Div>
          ),
        )}
      </div>
    );
  }
}

export default ReviewList;
