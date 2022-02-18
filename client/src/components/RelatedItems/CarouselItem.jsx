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
      currentProduct: {},
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
        });
      });
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
                  <tr>
                    <td>{productFeature}</td>
                    <td>{feature}</td>
                    <td>{currentProductFeature}</td>
                  </tr>
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
  z-index: 2;
  width: 300px;
  height: 234px;
  overflow: auto;
  transform: translate(-75px, -10px);
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.8);
`;

const Content = styled.div`
  width: 300px;
  height: 234px;
  display: grid;
  color: white;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: repeat(auto-fit, 15%);
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
  border: 1px solid white;
  text-align: center;
  border-collapse: collapse;
`;

const TR = styled.tr`
  border: 1px solid white;
`;
// const StrikeThrough = styled.Text`
//     text-decoration: line-through;
// `;

export default CarouselItem;
