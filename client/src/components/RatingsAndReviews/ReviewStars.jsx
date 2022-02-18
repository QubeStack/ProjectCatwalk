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
    color: gold;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 50%;
  }`;

class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    let rating = this.props.rating;
    for (var i = 5; i > 0; i--) {
      console.log("star");
    }
    return (
      <Inline>
        <Star />
      </Inline>
    );
  }
}

export default ReviewStars;