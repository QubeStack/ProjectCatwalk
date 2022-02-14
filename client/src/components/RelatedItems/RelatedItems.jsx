import React from 'react';
import styled from 'styled-components';
import OutfitItems from './OutfitItems';
import SimilarItems from './SimilarItems';
import MultiDisplayCarousel from './MultiDisplayCarousel';

const StyledDiv = styled.div`
    border: 2px solid red;
    border-radius: 3px;
  `;

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <StyledDiv>
        <OutfitItems />
        <MultiDisplayCarousel />
        <SimilarItems />
        <MultiDisplayCarousel />
      </StyledDiv>
    );
  }
}

export default RelatedItems;
