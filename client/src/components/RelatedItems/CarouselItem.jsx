/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import Star from '../RatingsAndReviews/ReviewStars';

class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      salePrice: null,
      photo: '',
      currentProduct: {},
      avgRating: 0,
    };
    this.setStorage = this.setStorage.bind(this);
    this.removeItemFromStorage = this.removeItemFromStorage.bind(this);
    this.clickRoute = this.clickRoute.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (!this.props.addCard) {
      axios({
        method: 'get',
        url: '/api/product/styles',
        params: {
          product_id: this.props.product.id,
        },
      })
        .then((styles) => {
          if (styles.data.results !== undefined) {
            const salePrice = styles.data.results[0].sale_price;
            const photo = styles.data.results[0].photos[0].thumbnail_url;
            // const { name } = styles.data.results[0];
            this.setState({
              salePrice,
              photo,
              // name,
            });
          }
        })
        .catch(() => {
        });

      axios.get('/api/product/reviews', {
        params: {
          product_id: this.props.product.id,
        },
      })
        .then((results) => {
          let avgRating = 0;
          results.data.results.forEach((review) => {
            avgRating += review.rating;
          });
          avgRating /= results.data.results.length;
          avgRating = Math.floor(avgRating / 0.25) * 0.25;
          this.setState({ avgRating });
        })
        .catch(() => {
        });
    }
    axios({
      method: 'get',
      url: '/api/product',
      params: {
        product_id: this.props.id,
      },
    })
      .then((product) => {
        this.setState({
          currentProduct: product.data,
          // finished: true,
        });
      })
      .catch(() => {
      });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({
      showModal: false,
    });
  }

  setStorage() {
    if (localStorage.getItem('myOutfit') === null) {
      localStorage.setItem('myOutfit', JSON.stringify([this.state.currentProduct]));
    } else {
      let outfit = JSON.parse(localStorage.getItem('myOutfit'));
      if (!Array.isArray(outfit)) {
        outfit = [outfit];
      }
      if (outfit.every((item) => item.id !== this.state.currentProduct.id)) {
        outfit.push(this.state.currentProduct);
      }
      localStorage.setItem('myOutfit', JSON.stringify(outfit));
      this.props.render();
    }
  }

  removeItemFromStorage() {
    let outfit = JSON.parse(localStorage.getItem('myOutfit'));
    if (!Array.isArray(outfit)) {
      outfit = [outfit];
    }
    const newOutfit = outfit.filter((item) => item.id !== this.props.product.id);
    localStorage.setItem('myOutfit', JSON.stringify(newOutfit));
    this.props.render();
  }

  clickRoute() {
    console.log(this.props.product.id);
  }

  render() {
    // if (!this.state.finished) {
    //   return <div />;
    // }
    let card;
    let modal;
    let featureArray;
    let featureArray2;
    let allFeatures;

    if (this.props.product.features !== undefined
      && this.state.currentProduct.features !== undefined) {
      featureArray = this.props.product.features.map((feature) => feature.feature);
      featureArray2 = this.state.currentProduct.features.map((feature) => feature.feature);
      allFeatures = featureArray.concat(featureArray2);
    }

    const uniqueFeatures = Array.from(new Set(allFeatures));

    if (this.state.showModal) {
      modal = (
        <Modal>
          <Content>
            <CloseButton onClick={this.handleClose}>&times;</CloseButton>
            <ModalTitle>Comparing</ModalTitle>
            <Table>
              <TR>
                <th>{this.props.product.name}</th>
                <th> </th>
                <th>{this.state.currentProduct.name}</th>
              </TR>
              {uniqueFeatures.map((feature) => {
                let productFeature = '';
                let currentProductFeature = '';
                this.props.product.features.forEach((one) => {
                  if (one.feature === feature) {
                    if (one.value === null) {
                      productFeature = '\u2713';
                    } else {
                      productFeature = one.value;
                    }
                  }
                });
                this.state.currentProduct.features.forEach((two) => {
                  if (two.feature === feature) {
                    currentProductFeature = two.value;
                  }
                });
                return (
                  <TR2>
                    <td>{productFeature}</td>
                    <td>{feature}</td>
                    <td>{currentProductFeature}</td>
                  </TR2>
                );
              })}
            </Table>
          </Content>
        </Modal>
      );
    } else {
      modal = <> </>;
    }

    if (this.props.addCard) {
      card = <AddCard onClick={this.setStorage}>+</AddCard>;
      modal = <> </>;
    } else {
      let actionButton;
      if (this.props.actionButton === '+') {
        actionButton = (
          <ActionButton onClick={this.handleClick}>
            &#9733;
          </ActionButton>
        );
      } else {
        actionButton = (
          <ActionButton onClick={this.removeItemFromStorage}>
            &times;
          </ActionButton>
        );
      }

      let price;
      if (this.state.salePrice === null) {
        price = (
          <Price>
            $
            {this.props.product.default_price}
          </Price>
        );
      } else {
        price = (
          <Price>
            $
            {this.state.salePrice}
          </Price>
        );
      }

      card = (
        <Wrapper className="card">
          <ImageLink>
            <Link to={`/products/${this.props.product.id}`} style={{ textDecoration: 'none', color: '#1f513f' }} replace>
              <Image photo={this.state.photo} onClick={this.clickRoute} />
            </Link>
          </ImageLink>
          {actionButton}
          <NameLink>
            <Link to={`/products/${this.props.product.id}`} style={{ textDecoration: 'none', color: '#1f513f' }} replace>
              <Name onClick={this.clickRoute}>
                {this.props.product.name}
              </Name>
            </Link>
          </NameLink>
          <Category onClick={this.clickRoute}>
            {this.props.product.category}
          </Category>
          { modal }
          {price}
          <Stars>
            <Star rating={this.state.avgRating} size="15px" />
          </Stars>
        </Wrapper>
      );
    }

    return (
      <div>
        { card }
        {/*
        <Routes>
          <Route exact path="products/:id" element={<DisplayApp />} />
        </Routes> */}
      </div>
    );
  }
}

const NameLink = styled.div`
  grid-column: 1/-1;
  grid-row: 6;
  &: hover {
    cursor: pointer;
  }
`;

const ImageLink = styled.div`
  grid-column: 1/-1;
  grid-row: 1/5;
`;

const AddCard = styled.div`
  width: 150px;
  height: 214px;
  color: #1f513f;
  background-color: #f4f2ed;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  &: hover {
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  margin: 15px;
  grid-template-columns: 30px 30px 30px 30px 30px;
  grid-template-rows: auto;
  color: #1f513f;
  background-color: #f4f2ed;
`;

export const Image = styled.div`
  background: url(${(props) => props.photo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  text-align: center;
  color: #1f513f;
  background-color: #f4f2ed;
  height: 150px;
  width: 150px;
  grid-column: 1/-1;
  grid-row: 1/5;
  &: hover {
    cursor: pointer;
  }
`;

export const ActionButton = styled.div`
  grid-column: 5;
  grid-row: 1;
  margin-top: 5px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: #f4f2ed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  &: hover {
    cursor: pointer;
    background: yellow;
  }
`;

export const Name = styled.div`
  grid-column: 1/-1;
  grid-row: 6;
  &: hover {
    cursor: pointer;
  }
`;

export const Category = styled.div`
  grid-column: 1/-1;
  grid-row: 7;
`;

export const Price = styled.div`
  grid-column: 1/-1;
  grid-row: 8;
`;

export const Stars = styled.div`
  grid-column: 1/-1;
  grid-row: 9;
`;

const Modal = styled.div`
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  position: absolute;
  z-index: 2;
  width: 250px;
  height: 234px;
  overflow: auto;
  transform: translate(-50px, -10px);
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.8);
`;

const Content = styled.div`
  width: 250px;
  height: 234px;
  display: grid;
  color: white;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: repeat(auto-fit, 20%);
`;

const CloseButton = styled.div`
  color: #aaaaaa;
  grid-row: 1;
  grid-column: 5;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  &: hover {
    cursor: pointer;
    color: black;
  }
`;

const ModalTitle = styled.div`
  grid-row: 1;
  grid-column: 3/4;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  grid-row: 2/-1;
  grid-column: 1/-1;
  text-align: center;
  border-collapse: collapse;
`;

const TR = styled.tr`
  border: 1px solid white;
  font-size: small;
  color: white;
`;

const TR2 = styled.tr`
  font-size: small;
  color: white;
`;

// const StrikeThrough = styled.Text`
//     text-decoration: line-through;
// `;

export default CarouselItem;
