/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salePrice: null,
      photo: '',
      name: '',
    };
    this.setStorage = this.setStorage.bind(this);
    this.removeItemFromStorage = this.removeItemFromStorage.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/product/styles',
      params: {
        product_id: this.props.product.id,
      },
    })
      .then((styles) => {
        const salePrice = styles.data.results[0].sale_price;
        const photo = styles.data.results[0].photos[0].thumbnail_url;
        const { name } = styles.data.results[0];
        this.setState({
          salePrice,
          photo,
          name,
        });
      });
  }

  setStorage() {
    if (localStorage.getItem('myOutfit') === null) {
      localStorage.setItem('myOutfit', JSON.stringify([this.props.product]));
    } else {
      let outfit = JSON.parse(localStorage.getItem('myOutfit'));
      if (!Array.isArray(outfit)) {
        outfit = [outfit];
      }
      if (outfit.every((item) => item.id !== this.props.product.id)) {
        outfit.push(this.props.product);
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

  render() {
    let actionButton;
    if (this.props.actionButton === '+') {
      actionButton = (
        <ActionButton type="button" onClick={this.setStorage}>
          {this.props.actionButton}
        </ActionButton>
      );
    } else {
      actionButton = (
        <ActionButton type="button" onClick={this.removeItemFromStorage}>
          {this.props.actionButton}
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
          <>
            <StrikeThrough>
              $
              {this.props.product.default_price}
            </StrikeThrough>
            $
            {this.state.salePrice}
          </>
        </Price>
      );
    }

    return (
      <Wrapper className="card">
        <Image photo={this.state.photo} />
        {actionButton}
        <Name>
          {this.props.product.name}
        </Name>
        <Category>
          {this.props.product.category}
        </Category>
        {price}
        <Stars>
          Stars
        </Stars>
      </Wrapper>
    );
  }
}

export const Wrapper = styled.div`
  display: grid;
  margin: 15px;
  grid-template-columns: 30px 30px 30px 30px 30px;
  grid-template-rows: auto;
`;

export const Image = styled.div`
  background: url(${(props) => props.photo}) 50% 50%;
  text-align: center;
  color: white;
  height: 150px;
  width: 150px;
  grid-column: 1/-1;
  grid-row: 1/5;
`;

export const ActionButton = styled.button`
  grid-column: 5;
  grid-row: 1;
`;

export const Name = styled.div`
  grid-column: 1/-1;
  grid-row: 6;
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

const StrikeThrough = styled.Text`
    text-decoration: line-through;
`;

export default CarouselItem;
