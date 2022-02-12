import React from 'react';
import styled from 'styled-components';
// import axios from 'axios';
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

    this.state = {
      // productIDs: []
    };
  }

  // componentDidMount() {
  //   fetch('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', { method: 'GET', headers: new Headers({Authorization: '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' }) })
  //     .then((results) => {
  //       const productIDs = [];
  //       for (let i = 0; i < results.length; i += 1) {
  //         productIDs.push(results[i].id);
  //       }
  //       console.log(results);
  //     });
  // }

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
