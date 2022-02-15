import React from 'react';
import styled from 'styled-components';
import data from './dummy_data';
import ReviewItem from './ReviewItem';

const axios = require('axios');

const Div = styled.div`
border-style: solid;
border-color: #1f513f;;
padding: 3px;
margin: 4px;
`;

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 40355

  // componentDidMount() {
  //   const { id } = 40344;
  //   axios({
  //     method: 'get',
  //     url: '/api/product/reviews/',
  //     params: { product_id: id },
  //   })
  //     .then((results) => {
  //       console.log("reviews results:", results.data);
  //       res.send(results.data);
  //     });
  // }

  render() {
    return (
      <div>
        {data.results.map(
          (review) => (
            <Div>
              <ReviewItem
                summary={review.summary}
                username={review.reviewer_name}
                date={review.date}
                body={review.body}
                recommend={review.recommend}
                response={review.response}
              />
            </Div>
          ),
        )}
      </div>
    );
  }
}

export default ReviewList;
