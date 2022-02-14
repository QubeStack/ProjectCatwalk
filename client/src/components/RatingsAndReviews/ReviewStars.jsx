import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
border-style: solid;
border-color: blue;
padding: 3px;
`;

class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Div>⭐⭐⭐⭐⭐</Div>
    );
  }
}

export default ReviewStars;