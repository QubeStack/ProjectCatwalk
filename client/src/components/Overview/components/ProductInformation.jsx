import React from 'react';
import styled, { keyframes } from 'styled-components';
import facebook from '../icons/iconmonstr-facebook-4-24.png';
import twitter from '../icons/iconmonstr-twitter-4-24.png';
import pinterest from '../icons/iconmonstr-pinterest-1-24.png';
import Stars from '../../RatingsAndReviews/ReviewStars';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

const shake = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-20deg);
  }
  75% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0);
  }`;

const ProductContainer = styled.div`
  display: grid;
  border-style: hidden;
  border-color: #1F513F;

  border-radius: 10px;
  color: #102920;
  grid-column: span 3;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 1rem;
  padding: 5px;
  margin: 5px;
  height: 87vh;
  position: relative;
  overflow: hidden;

`;

const Info = styled.div`
  width: 100%;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  `;

const Price = styled.div`
  width: 100%
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  text-decoration: ${({ sale }) => (sale ? 'line-through' : '')}`;

const Sale = styled.div`
  width: 30%;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  color: red`;

const ReviewLink = styled.div`
  width: 100%;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  &:hover{
  cursor: pointer;
  };`;

const Name = styled.div`
  font-size: calc(14px + (28 - 14) * ((100vw - 300px) / (1600 - 300)));
  font-weight: bold;`;

const RatingsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr, 1fr;
  grid-auto-flow: column;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));`;

const IconContainer = styled.div`
  justify-self:center;
  margin-bottom: 20px;
  margin-top: 20px;`;

const Icon = styled.img`
  padding-right: 3em;
  width: 30px;
  height: 30px;
  &:hover, :focus{
    cursor: pointer;
    animation-name: ${shake};
    animation-duration: 1s;
    animation-iteration-count: 2;
    animation-timing-function: ease-in-out;
    };
  `;

const Style = styled.span`
font-weight: bold;
font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));`;

const StyleInfo = styled.div`
  margin-bottom: 20px;`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // products: [],
      reviews: null,
      avgRating: null,
      // sale: false,
    };

    this.getReview = this.getReview.bind(this);
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      const { reviews } = this.props;
      this.getReview(reviews);
    }
  }

  getReview(reviews) {
    let avgRating = 0;
    reviews.map((review) => avgRating += review.rating);
    avgRating /= reviews.length;
    avgRating = Math.floor(avgRating / 0.25) * 0.25;
    this.setState({ reviews: reviews.length, avgRating });
  }

  render() {
    const {
      product, styles, selectedStyle, changeStyle, scroll, favorited, addFav, removeFav,
    } = this.props;
    const { reviews, avgRating } = this.state;
    return (
      <ProductContainer className="ProductInfo">
        {product && styles && selectedStyle && changeStyle ? (
          <>
            {reviews <= 0 ? (
              <RatingsContainer>
                <div />
                <div />
              </RatingsContainer>
            ) : (
              <RatingsContainer>
                <Stars rating={avgRating} size={16} />
                <ReviewLink role="link" tabIndex="0" onKeyDown={this.handleKeyDown} onClick={() => { scroll(); }} style={{ textDecoration: 'underline' }}>
                  Read all {reviews} reviews
                </ReviewLink>
              </RatingsContainer>
            )}
            <Info>
              Category
              /

              {product.category}
            </Info>
            <Name>{product.name}</Name>
            {selectedStyle.sale_price
              ? (
                <>
                  <Sale sale={selectedStyle.sale_price}>
                    $
                    {selectedStyle.sale_price}
                  </Sale>
                  <Price sale={selectedStyle.sale_price}>
                    $
                    {selectedStyle.original_price}
                  </Price>
                </>
              ) : (
                <Price sale={selectedStyle.sale_price}>
                  $
                  {selectedStyle.original_price}
                </Price>
              )}
            <Info>{product.description}</Info>
            <IconContainer>
              <Icon src={facebook} alt="" tabIndex={0} />
              <Icon src={twitter} alt="" tabIndex={0} />
              <Icon src={pinterest} alt="" tabIndex={0} />
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
            <AddToCart
              selectedStyle={selectedStyle}
              product={product}
              favorited={favorited}
              addFav={addFav}
              removeFav={removeFav}
            />
          </>
        ) : null }
      </ProductContainer>
    );
  }
}

export default ProductInformation;
