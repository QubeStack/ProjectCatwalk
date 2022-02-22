import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import facebook from '../icons/iconmonstr-facebook-4-24.png';
import twitter from '../icons/iconmonstr-twitter-4-24.png';
import pinterest from '../icons/iconmonstr-pinterest-1-24.png';
import Stars from '../../RatingsAndReviews/ReviewStars';
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
  height: 87vh;
  position: relative;
`;

const Info = styled.div`
  width: 100%;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  `;

const ReviewLink = styled.div`
  width: 100%;
  font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  &:hover{
  cursor: pointer;
  };`;

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
  margin-bottom: 30px;
  margin-top: 30px;`;

const Icon = styled.img`
  padding-right: 1em;
  width: 30px;
  height: 30px;
  &:hover{
    cursor: pointer;
    };`;

const Style = styled.span`
font-weight: bold;
font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));`;

const StyleInfo = styled.div`
  margin-bottom: 40px;`;

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // products: [],
      reviews: null,
      avgRating: null,
    };

    this.getReview = this.getReview.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.getReview(id);
    }
  }

  getReview(id) {
    axios.get('/api/product/reviews', {
      params: {
        product_id: id,
      },
    })
      .then((results) => {
        let avgRating = 0;
        results.data.results.map((review) => avgRating += review.rating);
        avgRating /= results.data.results.length;
        avgRating = Math.floor(avgRating / 0.25) * 0.25;
        console.log(avgRating);
        console.log(results.data.results);
        this.setState({ reviews: results.data.results.length, avgRating });
      });
  }

  render() {
    const {
      product, styles, selectedStyle, changeStyle, scroll, favorited, addFav, removeFav,
    } = this.props;
    const { reviews, avgRating } = this.state;
    return (
      <ProductContainer>
        {product && styles && selectedStyle && changeStyle ? (
          <>
            {reviews <= 0 ? (
              <RatingsContainer>
                <div />
                <div />
              </RatingsContainer>
            ) : (
              <RatingsContainer>
                <Stars rating={avgRating} />
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
