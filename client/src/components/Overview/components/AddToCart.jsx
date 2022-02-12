import React from 'react';
import styled from 'styled-components';

const StyledCart = styled.div`
  display: grid;
  `;

class AddToCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <StyledCart>
        <select>
          <option value="option 1">Size Selector Dropdown</option>
        </select>
        <select>
          <option value="option 1">Item Quantity Dropdown</option>
        </select>
        <button type="button">Add To Cart</button>
        <button type="button">Fav</button>
      </StyledCart>
    );
  }
}

export default AddToCart;
