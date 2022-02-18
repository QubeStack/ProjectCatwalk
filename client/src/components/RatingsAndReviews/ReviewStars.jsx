import React from 'react';
import styled from 'styled-components';

const Inline = styled.div`
display: flex;
`;

const Star = styled.span`
  color: #a6a6a6;
  font-size: 24px;
  position: relative;
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
    width: 100%;
  }`;

class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let rating = this.props.rating;
    let stars = [];
    for (var i = 5; i > 0; i--) {
      if (rating >= 1) {
        stars.push(<Star />);
        rating--;
      } else {
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