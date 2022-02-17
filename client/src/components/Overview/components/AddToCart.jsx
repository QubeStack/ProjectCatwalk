import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledCart = styled.div`
  display: grid;
  `;

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skus: [],
      currentSku: [],
      quantity: [],
      noStock: false,
      currentSize: 'Select Size',
      currentQuantity: null,
      sizeSelected: true,
    };

    this.getSkus = this.getSkus.bind(this);
    this.parseSkus = this.parseSkus.bind(this);
    this.changeSku = this.changeSku.bind(this);
    this.checkStock = this.checkStock.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      const { selectedStyle } = this.props;
      this.getSkus(selectedStyle);
    }
  }

  handleCart() {
    // e.preventDefault();
    const {
      currentSku, currentQuantity, skus, currentSize,
    } = this.state;
    // eslint-disable-next-line camelcase
    // const cart = `${count}, ${sku_id}`;
    // alert(cart);
    if (currentSize !== "Select Size") {
      // alert(currentSize);
      // eslint-disable-next-line camelcase
      const sku_id = skus[currentSku][0];
      const count = currentQuantity;
      // eslint-disable-next-line camelcase
      axios.post('/api/cart', { sku_id, count });
    } else {
      // alert(currentSize);
      this.setState({ sizeSelected: false });
    }
  }

  getSkus(style) {
    if (style) {
      this.parseSkus(style.skus);
      // this.setState({ skus: style.skus });
    }
  }

  parseSkus(skus) {
    if (skus) {
      const skuArr = Object.entries(skus);
      this.checkStock(skuArr);
      this.setState({ skus: skuArr });
    }
  }

  checkStock(skus) {
    let count = 0;
    for (let i = 0; i < skus.length; i += 1) {
      count += skus[i][1].quantity;
    }
    if (count < 0) {
      this.setState({ noStock: true });
    }
  }

  changeSku(e) {
    e.preventDefault();
    const { skus } = this.state;
    const selected = skus[e.target.value];
    if (selected) {
      const amount = selected[1].quantity;
      const { size } = selected[1];
      this.setState({
        currentSku: e.target.value,
        quantity: amount,
        currentSize: size,
        sizeSelected: true,
      });
    }
  }

  changeQuantity(e) {
    e.preventDefault();
    this.setState({ currentQuantity: e.target.value });
  }

  render() {
    const {
      skus, currentSku, quantity, noStock, currentSize, sizeSelected,
    } = this.state;
    // const size = Array.from(Array(quantity).keys());
    const size = [];
    for (let i = 1; i <= quantity; i += 1) {
      size.push(i);
    }
    // console.log(size);
    let disabled = true;
    if (currentSku.length > 0) {
      disabled = false;
    }
    return (
      <StyledCart>
        {sizeSelected ? (
          <select onChange={this.changeSku} disabled={noStock} selected={currentSize}>
            <option value="Select Size">Select Size</option>
            {skus.map((sku, i) => (
              sku[1].quantity > 0 ? (
                <option value={i}>{sku[1].size}</option>
              )
                : <option value={i}>OUT OF STOCK</option>))}
          </select>
        ) : (
          <>
            <span>Please select size</span>
            <select
              onChange={this.changeSku}
              disabled={noStock}
              size={6}
              ref={this.myRef}
            >
              <option value="Select Size">Select Size</option>
              {skus.map((sku, i) => (
                sku[1].quantity > 0 ? (
                  <option value={i}>{sku[1].size}</option>
                )
                  : <option value={i}>OUT OF STOCK</option>))}
            </select>
          </>
        )}
        <select onChange={this.changeQuantity} disabled={disabled}>
          <option value="-">-</option>
          {size.map((num) => (
            // sku[1].quantity > 0 ? (
            <option value={num}>{num}</option>
            // )
            // : null)
          ))}
        </select>
        {!noStock ? <button type="button" onClick={this.handleCart}>Add To Cart</button> : null}
        <button type="button">Fav</button>
      </StyledCart>
    );
  }
}

export default AddToCart;
