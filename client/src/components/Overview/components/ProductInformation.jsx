import React from 'react';
import styled from 'styled-components';
import facebook from '../icons/iconmonstr-facebook-4-24.png';
import twitter from '../icons/iconmonstr-twitter-4-24.png';
import pinterest from '../icons/iconmonstr-pinterest-1-24.png';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

const ProductContainer = styled.div`
  display: grid;
  border-style: hidden;
  border-color: #1F513F;
  background-color: #f4f2ed;
  border-radius: 5px;
  padding: 5px;
  color: #1F513F;
  grid-column: span 3;
  grid-column-template: 1fr;
  gap: 1em;`;

const RatingsContainer = styled.div`
  display: grid;
  grid-column-template: 1fr, 1fr;
  grid-auto-flow: column;`;

const IconContainer = styled.div`
  justify-self:center;`;

const Icon = styled.img`
  padding-right: 1em;`;

const Style = styled.span`
font-weight: bold;`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  // componentDidUpdate(previousprops) {
  //   if (previousprops !== this.props) {
  //     this.setState({products: this.props});
  //   }
  // }

  static handleScrollTo() {
    // const xpath = "//div[contains(text(),'Ratings and Reviews here')]";
    // // eslint-disable-next-line max-len
    // const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    // matchingElement.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });
    //
  }

  render() {
    const {
      product, styles, selectedStyle, changeStyle,
    } = this.props;
    return (
      <ProductContainer>
        {product && styles && selectedStyle && changeStyle ? (
          <>
            <RatingsContainer>
              <div>⭐⭐⭐⭐⭐</div>
              <div role="link" tabIndex="0" onKeyDown={this.handleKeyDown} onClick={() => { this.handleScrollTo(); }}>Read Reviews</div>
            </RatingsContainer>
            <div>{product.category}</div>
            <div>{product.name}</div>
            <div>
              $
              {selectedStyle.original_price}
            </div>
            <div>{product.description}</div>
            <IconContainer>
              <Icon src={facebook} alt="" />
              <Icon src={twitter} alt="" />
              <Icon src={pinterest} alt="" />
            </IconContainer>
            <div>
              <span>Current style: </span>
              <Style>{selectedStyle.name}</Style>
            </div>
            <StyleSelector
              product={product}
              styles={styles}
              selectedStyle={selectedStyle}
              changeStyle={changeStyle}
            />
            <AddToCart selectedStyle={selectedStyle} />
          </>
        ) : null }

      </ProductContainer>
    );
  }
}

export default ProductInformation;
