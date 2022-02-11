import React from 'react';
import styled from 'styled-components';
import ImageGallery from './components/ImageGallery';
import ProductInformation from './components/ProductInformation';

const StyledContainer = styled.div`
  display: grid;
  border: solid;
  padding: 5px;
  gap: 1rem;
  grid-template-columns: repeat(5, 1fr);`;
const StyledH2 = styled.h2`
  justify-self: center;
  grid-column: span 5;`;

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <StyledContainer>
        <StyledH2>Product Overview</StyledH2>
        <ImageGallery />
        <ProductInformation />
      </StyledContainer>
    );
  }
}

export default Overview;
