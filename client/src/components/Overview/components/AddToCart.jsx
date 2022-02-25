import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledCart = styled.div`
  display: flex;
  position: relative;`;

const Add = styled.button`
  border-color: #1F513F;
  background-color: white;
  border-radius: 12px;
  position: absolute;
  bottom: -350%;
  height: 200%;
  width: 30%;
  box-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb,  0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1),  0 0 5px rgba(0,0,0,.1),  0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2),  0 20px 20px rgba(0,0,0,.15);
  &:hover{
    cursor: pointer;
    };`;

const Fav = styled.button`
  border-color: #1F513F;
  background-color:  white;
  width: 20%;
  position: absolute;
  bottom: -350%;
  right: 45%;
  height: 200%;
  color: ${({ favorited }) => (favorited ? 'gold' : '#1F513F')};
  border-radius: 12px;
  box-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb,  0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1),  0 0 5px rgba(0,0,0,.1),  0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2),  0 20px 20px rgba(0,0,0,.15);
  &:hover{
    cursor: pointer;
    };`;

const Size = styled.select`
  border-radius: 10px;
  height: 200%;
  width: 40%;
  margin-right: 5px;
  text-align: center;
    text-align-last: center;
    -moz-text-align-last: center;`;

const Quantity = styled.select`
  border-radius: 12px;
  height: 200%;
  width: 15%;
  text-align: center;
    text-align-last: center;
    -moz-text-align-last: center;`;

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
      // favorited: false,
      count: 0,
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
      const { selectedStyle, product } = this.props;
      this.getSkus(selectedStyle);
    }
  }

  // componentDidMount() {
  //   const { selectedStyle, product } = this.props;
  //   this.getSkus(selectedStyle);
  // }

  handleCart() {
    const {
      currentSku, currentQuantity, skus, currentSize,
    } = this.state;
    if (currentSize !== 'Select Size') {
      const sku_id = skus[currentSku][0];
      const count = currentQuantity;
      // eslint-disable-next-line camelcase
      axios.post('/api/cart', { sku_id, count });
    } else {
      this.setState({ sizeSelected: false });
    }
  }

  getSkus(style) {
    if (style) {
      this.parseSkus(style.skus);
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
    const { skus, currentSize } = this.state;
    const selected = skus[e.target.value];
    if (e.target.value === 'Select Size') {
      this.setState({
        currentSku: [],
        quantity: [],
        currentSize: 'Select Size',
        sizeSelected: true,
      });
    } else {
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
    const {
      product,
      favorited,
      addFav,
      removeFav,
    } = this.props;
    const size = [];
    for (let i = 1; i <= quantity; i += 1) {
      size.push(i);
    }
    let disabled = true;
    if (currentSku.length > 0) {
      disabled = false;
    }
    let handleFav = addFav;
    if (favorited) {
      handleFav = removeFav;
    }
    return (
      <StyledCart className="Cart">
        {sizeSelected ? (
          <Size onChange={this.changeSku} disabled={noStock} selected={currentSize}>
            <option value={currentSize} hidden>{currentSize}</option>
            {skus.map((sku, i) => (
              sku[1].quantity > 0 ? (
                <option value={i}>{sku[1].size}</option>
              )
                : <option value={i}>OUT OF STOCK</option>))}
          </Size>
        ) : (
          <>
            <span>Please select size</span>
            <Size
              onChange={this.changeSku}
              disabled={noStock}
              size={6}
              selected={currentSize}
              // ref={this.myRef}
            >
              <option value="Select Size">Select Size</option>
              {skus.map((sku, i) => (
                sku[1].quantity > 0 ? (
                  <option value={i}>{sku[1].size}</option>
                )
                  : <option value={i}>OUT OF STOCK</option>))}
            </Size>
          </>
        )}
        <Quantity onChange={this.changeQuantity} disabled={disabled}>
          <option value="-">-</option>
          {size.map((num) => (
            <option value={num}>{num}</option>
          ))}
        </Quantity>
        {!noStock ? <Add type="button" onClick={this.handleCart}>Add To Cart</Add> : null}
        <Fav type="button" onClick={() => { handleFav(); }} favorited={favorited}>&#9734;</Fav>
      </StyledCart>
    );
  }
}

export default AddToCart;
