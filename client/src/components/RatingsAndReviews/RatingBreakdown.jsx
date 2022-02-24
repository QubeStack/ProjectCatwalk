import React from 'react';
import styled from 'styled-components';
import Stars from './ReviewStars';

const BigText = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 20px;
font-weight: bold;
font-family: verdana;
color: black;
background-color: #f4f2ed;
`;

const Inline = styled.div`
display: flex;
border-style: solid;
border-color: white;
`;

const Text = styled.div`
display: flex;
justify-content: center;
font-size: 12px;
`;

const Center = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Bar = styled.span`
  background-color: #a6a6a6;
  height: 10px;
  width: 150px;
  border-radius: 5px;
  position: relative;
  display: block;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  &:before {
    content: '';
    overflow: hidden;

  }
  &:after {
    content: '';
    background-color: ${props => props.empty ? "#a6a6a6" : "green"};
    position: absolute;
    height: 10px;
    border-radius: 5px;
    top: 0;
    left: 0;
    overflow: hidden;
    width: ${props => props.width + '%'};
  }`;

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  AverageRating(reviews) {
    const ratingSummary = {
      rating: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    if (reviews.length > 0) {
      reviews.forEach((review) => {
        ratingSummary.rating += Number(review.rating);
        ratingSummary[Number(review.rating)] += 1;
      });
    }
    return ratingSummary;
  }

  render() {
    const totalReviews = this.props.reviews.length;
    const ratingSummary = this.AverageRating(this.props.reviews);
    return (
      <>
        <BigText  className="ratingBreakdown">
          <Stars rating={ratingSummary.rating / totalReviews} />
          <div>{ratingSummary.rating / totalReviews}</div>
        </BigText>
        <Center>
          <Inline>
            <Text>
              5-Star
            </Text>
            <Bar width={(ratingSummary[5] / totalReviews) * 100} />
            <Text>
              {((ratingSummary[5] / totalReviews) * 100) + '%'}
            </Text>
          </Inline>

          <Inline>
            <Text>
              4-Star
            </Text>
            <Bar width={(ratingSummary[4] / totalReviews) * 100} />
            <Text>
              {((ratingSummary[4] / totalReviews) * 100) + '%'}
            </Text>
          </Inline>

          <Inline>
            <Text>
              3-Star
            </Text>
            <Bar width={(ratingSummary[3] / totalReviews) * 100} />
            <Text>
              {((ratingSummary[3] / totalReviews) * 100) + '%'}
            </Text>
          </Inline>

          <Inline>
            <Text>
              2-Star
            </Text>
            <Bar width={(ratingSummary[2] / totalReviews) * 100} />
            <Text>
              {((ratingSummary[2] / totalReviews) * 100) + '%'}
            </Text>
          </Inline>

          <Inline>
            <Text>
              1-Star
            </Text>
            <Bar width={(ratingSummary[1] / totalReviews) * 100} />
            <Text>
              {((ratingSummary[1] / totalReviews) * 100) + '%'}
            </Text>
          </Inline>
        </Center>
      </>
    );
  }
}

export default RatingBreakdown;
