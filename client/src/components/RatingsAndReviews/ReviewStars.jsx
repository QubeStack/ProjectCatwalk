import React from 'react';
import styled from 'styled-components';

const Inline = styled.div`
display: flex;
`;

const Star = styled.span`
  color: gold;
  font-size: 24px;
  position: relative;
  &:before {
    content: "\\2605";
    width: 50%;
  }
  &:after {
    content: "\\2606";
    color: black;
    position: absolute;
    top: 0;
    left: 0;
  }`;

class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Inline>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </Inline>
    );
  }
}

export default ReviewStars;