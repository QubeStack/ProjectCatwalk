import React from 'react';
import styled from 'styled-components';
import Stars from './ReviewStars';

const Inline = styled.div`
display: flex;
`;

const Bar = styled.span`
  color: #a6a6a6;
  font-size: 24px;
  position: relative;
  &:before {
    content: "\\2605";
    overflow: hidden;

  }
  &:after {
    content: "\\2605";
    color: ${props => props.empty ? "#a6a6a6" : "green"};
    position: absolute;
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

  // AverageRating(reviews) {
  //   let rating = 0;
  //   reviews.forEach(() => rating = rating + reviews.rating);
  //   console.log(rating);
  // }

  render() {
    return (
      <>
        {/* <Stars rating={AverageRating(this.props.reviews)} /> */}
        <div>
          <Bar />
        </div>
      </>
    );
  }
}

export default RatingBreakdown;
