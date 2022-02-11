import React from 'react';
import styled from 'styled-components';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

const ProductContainer = styled.div`
  display: grid;
  border: solid;
  padding: 5px;
  color: red`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ProductContainer>
        Product Information
        <StyleSelector />
        <AddToCart />
      </ProductContainer>
    );
  }
}

export default ProductInformation;
