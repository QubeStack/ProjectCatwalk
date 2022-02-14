import React from 'react';
import styled from 'styled-components';

class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Wrapper>
        <Image>
          Image
        </Image>
        <button type="button">
          add
        </button>
        <Item>
          Name
        </Item>
        <Item>
          Category
        </Item>
        <Item>
          Cost
        </Item>
        <Item>
          Stars
        </Item>
      </Wrapper>
    );
  }
}

export const Item = styled.div`
  position: absolute;
`;

export const Wrapper = styled.div`
  display: grid;
  margin: 15px;
`;

export const Image = styled.div`
  background: green;
  text-align: center;
  color: white;
  height: 150px;
  width: 150px;
`;

export default CarouselItem;
