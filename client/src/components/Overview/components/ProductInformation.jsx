import React from 'react';
import styled from 'styled-components';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

const ProductContainer = styled.div`
  display: grid;
  border: solid;
  padding: 5px;
  color: red;
  grid-column-template: 1fr`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static handleScrollTo() {
    const xpath = "//div[contains(text(),'Ratings and Reviews here')]";
    // eslint-disable-next-line max-len
    const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    matchingElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  render() {
    return (
      <ProductContainer>
        <div>Star Rating</div>
        <div role="link" tabIndex="0" onKeyDown={this.handleKeyDown} onClick={() => { this.handleScrollTo(); }}>Read Reviews</div>
        <div>Product Category</div>
        <div>Product Title</div>
        <div>Price</div>
        <div>Product Overview</div>
        <div>Social media share buttons</div>
        <StyleSelector />
        <AddToCart />
      </ProductContainer>
    );
  }
}

export default ProductInformation;
