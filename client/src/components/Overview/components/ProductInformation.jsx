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
  color: #1F513F;
  grid-column: span 3;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 1rem;
  padding: 5px;
  margin: 5px;
  height: 88vh;
  position: relative;
`;

const Info = styled.div`
  width: 100%;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  `;

const Name = styled.div`
  font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
  font-weight: bold;`;

const RatingsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr, 1fr;
  grid-auto-flow: column;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));`;

const IconContainer = styled.div`
  justify-self:center;
  margin-bottom: 40px;
  margin-top: 40px;`;

const Icon = styled.img`
  padding-right: 1em;`;

const Style = styled.span`
font-weight: bold;
font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));`;

const StyleInfo = styled.div`
  margin-bottom: 40px;`;

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
              <Info>⭐⭐⭐⭐⭐</Info>
              <Info role="link" tabIndex="0" onKeyDown={this.handleKeyDown} onClick={() => { this.handleScrollTo(); }}>Read Reviews</Info>
            </RatingsContainer>
            <Info>Category / {product.category}</Info>
            <Name>{product.name}</Name>
            <Info>
              $
              {selectedStyle.original_price}
            </Info>
            <Info>{product.description}</Info>
            <IconContainer>
              <Icon src={facebook} alt="" />
              <Icon src={twitter} alt="" />
              <Icon src={pinterest} alt="" />
            </IconContainer>
            <StyleInfo>
              <span>Current style: </span>
              <Style>{selectedStyle.name}</Style>
            </StyleInfo>
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
