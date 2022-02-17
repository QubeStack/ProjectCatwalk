import React from 'react';
import styled from 'styled-components';

const StyledCart = styled.div`
  display: grid;
  `;

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skus: [],
      arr: [],
      currentSku: [],
      quantity: [],
    };

    this.getSkus = this.getSkus.bind(this);
    this.parseSkus = this.parseSkus.bind(this);
    this.changeSku = this.changeSku.bind(this);
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      const { selectedStyle } = this.props;
      this.getSkus(selectedStyle);
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
      this.setState({ skus: skuArr });
    }
  }

  changeSku(e) {
    e.preventDefault();
    const { skus } = this.state;
    const selected = skus[e.target.value];
    if (selected) {
      const size = selected[1].quantity;
      this.setState({ currentSku: e.target.value, quantity: size });
    }
  }

  render() {
    const { skus } = this.state;
    const { currentSku } = this.state;
    const { quantity } = this.state;
    // const size = Array.from(Array(quantity).keys());
    const size = [];
    for (let i = 1; i <= quantity; i += 1) {
      size.push(i);
    }
    console.log(size);
    let disabled = true;
    if (currentSku.length > 0) {
      disabled = false;
    }
    return (
      <StyledCart>
        <select onChange={this.changeSku}>
          <option value="option 1">Size Selector Dropdown</option>
          {skus.map((sku, i) => (
            sku[1].quantity > 0 ? (
              <option value={i}>{sku[1].size}</option>
            )
              : null))}
        </select>
        <select disabled={disabled}>
          <option value="option 1">-</option>
          {size.map((num) => (
            // sku[1].quantity > 0 ? (
            <option value={num}>{num}</option>
            // )
            // : null)
          ))}
        </select>
        <button type="button">Add To Cart</button>
        <button type="button">Fav</button>
      </StyledCart>
    );
  }
}

export default AddToCart;
