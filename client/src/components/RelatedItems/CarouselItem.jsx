/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.setStorage = this.setStorage.bind(this);
  }

  setStorage() {
    localStorage.setItem('myOutfit', JSON.stringify(this.props.product));
  }

  render() {
    return (
      <Wrapper>
        <Image>
          Image
        </Image>
        <ActionButton type="button" onClick={this.setStorage}>
          +
        </ActionButton>
        <Name>
          {this.props.product.name}
        </Name>
        <Category>
          {this.props.product.category}
        </Category>
        <Price>
          $
          {this.props.product.default_price}
        </Price>
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
  background: green;
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

export default CarouselItem;
