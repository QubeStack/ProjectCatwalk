import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RatingBreakdown from './RatingBreakdown';
import ReviewsList from './ReviewsList';

const Center = styled.div`
display: flex;
justify-content: center;
`;

const Border = styled.div`
border-style: solid;
border-color: #1f513f;;
padding: 3px;
margin: 4px;
height: 550px;
width: 200px;
`;

const Div = styled.div`
border-style: solid;
border-color: white;
padding: 1px;
height: 550px;
width: 700px;
`;

const Inline = styled.div`
display: flex;
`;

const Scroll = styled.div`
border-style: solid;
border-color: white;
padding: 1px;
height: 500px;
width: 700px;
overflow-y: scroll;
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
        <Inline>
          <Border>
            <RatingBreakdown />
          </Border>
          <Center>
            {this.state.slice >= 4 ?
              <Scroll>
                <ReviewsList reviews={this.state.reviews.slice(0, this.state.slice)} />
              </Scroll>
              : <Div>
                <ReviewsList reviews={this.state.reviews.slice(0, this.state.slice)} />
              </Div>
            }
          </Center>
        </Inline>
        <Center>
          <div>
            <button type="button" onClick={() => this.setState({ slice: this.state.slice + 2 })}>
              See More Reviews
            </button>
          </div>
        </Center>
      </>
    );
  }
}

export default RatingsAndReviews;
