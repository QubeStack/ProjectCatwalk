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
        <CarouselSlot>
          Image
        </CarouselSlot>
        <button type="button">
          add
        </button>
        <div>
          Name
        </div>
        <div>
          Category
        </div>
        <div>
          Cost
        </div>
        <div>
          Stars
        </div>
      </Wrapper>
    );
  }
}

export const Wrapper = styled.div`
  display: grid;
  margin: 15px;
`;

export const CarouselSlot = styled.div`
  background: green;
  text-align: center;
  color: white;
  height: 150px;
  width: 150px;
`;

export default CarouselItem;
