/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      salePrice: null,
      photo: '',
      // name: '',
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
          const salePrice = styles.data.results[0].sale_price;
          const photo = styles.data.results[0].photos[0].thumbnail_url;
          // const { name } = styles.data.results[0];
          this.setState({
            salePrice,
            photo,
            // name,
          });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.product.id !== prevProps.product.id) {
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
          // const { name } = styles.data.results[0];
          this.setState({
            salePrice,
            photo,
            // name,
          });
        });
    }
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
    axios({
      method: 'get',
      url: '/api/product',
      params: {
        product_id: this.props.id,
      },
    })
      .then((product) => {
        if (localStorage.getItem('myOutfit') === null) {
          localStorage.setItem('myOutfit', JSON.stringify([product.data]));
        } else {
          let outfit = JSON.parse(localStorage.getItem('myOutfit'));
          if (!Array.isArray(outfit)) {
            outfit = [outfit];
          }
          if (outfit.every((item) => item.id !== product.data.id)) {
            outfit.push(product.data);
          }
          localStorage.setItem('myOutfit', JSON.stringify(outfit));
          this.props.render();
        }
      });
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
    let card;
    let modal;

    if (this.state.showModal) {
      modal = (
        <Modal>
          <Content>
            <CloseButton onClick={this.handleClose}>&times;</CloseButton>
            Hello
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
          <ActionButton type="button" onClick={this.handleClick}>
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
            $
            {this.state.salePrice}
          </Price>
        );
      }

      card = (
        <Wrapper className="card">
          <Image photo={this.state.photo} onClick={this.clickRoute} />
          {actionButton}
          { modal }
          <Name onClick={this.clickRoute}>
            {this.props.product.name}
          </Name>
          <Category onClick={this.clickRoute}>
            {this.props.product.category}
          </Category>
          {price}
          <Stars>
            Stars
          </Stars>
        </Wrapper>
      );
    }

    return (
      <div>
        { card }
      </div>
    );
  }
}

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

export const ActionButton = styled.button`
  grid-column: 5;
  grid-row: 1;
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
  &: hover {
    cursor: pointer;
  }
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
  z-index: 3;
  width: 150px;
  height: 214px;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const Content = styled.div`
  background-color: #f4f2ed;
  width: 150px;
  height: 214px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 75% 10% 10% 5%;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  grid-row-start: 1;
  grid-column-start: 4;
  font-size: 28px;
  font-weight: bold;
  &: hover {
    cursor: pointer;
    color: black;
  }
`;

// const StrikeThrough = styled.Text`
//     text-decoration: line-through;
// `;

export default CarouselItem;
