import React from 'react';
import styled from 'styled-components';

const StylesContainer = styled.div`
  display: grid;
  grid-column-template: repeat(4, 1fr);
  grid-auto-flow: column;
  grid-gap: 5px;`;

const StyleBox = styled.div`
  border: solid;`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <StylesContainer>
        <StyleBox>Style 1</StyleBox>
        <StyleBox>Style 2</StyleBox>
        <StyleBox>Style 3</StyleBox>
        <StyleBox>Style 4</StyleBox>
      </StylesContainer>
    );
  }
}

export default StyleSelector;
