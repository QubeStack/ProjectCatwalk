import React from 'react';
import styled from 'styled-components';
import OutfitItems from './OutfitItems';
import SimilarItems from './SimilarItems';

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
        <SimilarItems />
        <OutfitItems />
      </StyledDiv>
    );
  }
}

export default RelatedItems;
