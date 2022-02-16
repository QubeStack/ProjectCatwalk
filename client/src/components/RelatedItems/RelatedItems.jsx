/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
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
      tick: false,
    };
    this.reRender = this.reRender.bind(this);
  }

  reRender() {
    this.forceUpdate();
  }

  render() {
    return (
      <StyledDiv>
        <SimilarItems render={this.reRender} />
        <OutfitItems render={this.reRender} />
        <button type="button" onClick={this.reRender}>update</button>
      </StyledDiv>
    );
  }
}

export default RelatedItems;
