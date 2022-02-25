import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';
import ReviewsList from './ReviewsList';
import WriteNewReview from './WriteNewReview';

const Center = styled.div`
display: flex;
justify-content: center;
`;

const Border = styled.div`
margin: 4px;
height: 550px;
width: 300px;
`;

const Border2 = styled.div`
margin: 4px;
height: 550px;
width: 700px;
`;

// border-style: solid;
// border-color: #1f513f;

const Header = styled.div`
font-size: 20px;
color: #1f513f;
font-weight: bold;
`;

const Div = styled.div`
height: 500px;
width: 700px;
`;

const Inline = styled.div`
* {
  font-family: verdana;
}
display: flex;
`;

const PushRight = styled.div`
margin left: auto;
`;

const Scroll = styled.div`
border-style: solid;
border-color: white;
height: 500px;
width: 700px;
overflow-y: scroll;
`;

const Button = styled.button`
  border-style: solid;
  border-color: #1f513f;
  margin-left: 10px;
  background-color: white;
  border-radius: 2px;
  &: hover {
    background-color: #1f513f;
    cursor: pointer;
    border-color: #f4f2ed;
    color: #f4f2ed;
  };
  &: active {
    background-color: white;
    color: black;
    border-color: #1f513f;
    -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
     -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
          box-shadow: inset 0px 0px 15px #c1c1c1;
  };
`;

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      slice: 2,
      meta: {},
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
      })
      .catch((err) => console.log(err));
    axios({
      method: 'get',
      url: '/api/product/reviews/meta',
      params: { product_id: 40357 },
    })
      .then((results) => {
        this.setState({ meta: results.data });
        console.log("meta:", this.state.meta);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Center>
        <Inline ref={this.props.setRef} className="ratingsAndReviews">
          <Border>
            <RatingBreakdown reviews={this.state.reviews} />
            <ProductBreakdown meta={this.state.meta} />
          </Border>
          <Border2>
            <Header>
              <Inline>
                <div>Ratings and Reviews</div>
                <PushRight>
                  <WriteNewReview />
                </PushRight>

              </Inline>

            </Header>
            {this.state.slice >= 4 ?
              <Scroll>
                <ReviewsList reviews={this.state.reviews.slice(0, this.state.slice)} />
              </Scroll>
              : <Div>
                <ReviewsList reviews={this.state.reviews.slice(0, this.state.slice)} />
              </Div>
            }
            <Center>
              <Button type="button" onClick={() => this.setState({ slice: this.state.slice + 2 })}>
                See More Reviews
              </Button>
            </Center>

          </Border2>
        </Inline>
      </Center>
    );
  }
}

export default RatingsAndReviews;
