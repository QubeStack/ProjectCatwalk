import React from 'react';
import styled from 'styled-components';

const Inline = styled.div`
display: flex;
`;

const Star = styled.span`
  color: #a6a6a6;
  font-size: 24px;
  position: relative;
  margin-bottom: 5px;
  &:before {
    content: "\\2605";
    overflow: hidden;

  }
  &:after {
    content: "\\2605";
    color: ${props => props.empty ? "#a6a6a6" : "gold"};
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: ${props => props.threeforths ? "75%" : props.half ? "50%" : props.quarter ? "25%" : "100%"};
  }`;

// width: ${props => props.width + '%'};

class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let rating = this.props.rating;
    // let rating = 3.75;
    const stars = [];
    for (let i = 5; i > 0; i -= 1) {
      if (rating >= 1) {
        stars.push(<Star />);
        rating -= 1;
      } else if (rating < 1 && rating > 0) {
        if (rating > 0.75) {
          stars.push(<Star />);
        } else if (rating > 0.5 || rating === 0.75) {
          stars.push(<Star threeforths />);
        } else if (rating > 0.25 || rating === 0.5) {
          stars.push(<Star half />);
        } else if (rating > 0 || rating === 0.25) {
          stars.push(<Star quarter />);
        }
        // stars.push(<Star width={rating * 100} />);
        rating = 0;
      } else if (rating === 0) {
        stars.push(<Star empty />);
      }
    }
    return (
      <Inline>
        {stars}
      </Inline>
    );
  }
}

export default ReviewStars;
