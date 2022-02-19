import React from 'react';
import styled from 'styled-components';
import Stars from './ReviewStars';

const Inline = styled.div`
display: flex;
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
    width: 50%;
  }`;

  //width: ${props => props.width + '%'};

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
          <Bar />
          <Bar />
          <Bar />
          <Bar />
        </div>
      </>
    );
  }
}

export default RatingBreakdown;
