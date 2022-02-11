import React from 'react';
import styled from 'styled-components';

class MultiDisplayCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      direction: 'right',
      slide: false
    };
  }

  doSlide = (direction, position) => {
    this.setState({
      sliding: true,
      direction,
      position
    });

    setTimeout(() => {
      this.setState({
        sliding: false
      });
    }, 25);
  }


  render() {
    return (
      <>
        <CarouselContainer>
          <CarouselSlot>Item 1</CarouselSlot>
          <CarouselSlot>Item 2</CarouselSlot>
          <CarouselSlot>Item 3</CarouselSlot>
          <CarouselSlot>Item 4</CarouselSlot>
          <CarouselSlot>Item 5</CarouselSlot>
          <CarouselSlot>Item 1</CarouselSlot>
          <CarouselSlot>Item 2</CarouselSlot>
          <CarouselSlot>Item 3</CarouselSlot>
          <CarouselSlot>Item 4</CarouselSlot>
          <CarouselSlot>Item 5</CarouselSlot>
        </CarouselContainer>
        <button onClick={() => this.doSlide('right', this.position + 1)}>Next</button>
      </>
    );
  }
}

const CarouselContainer = styled.div`
  display: flex;
  margin: 0 0 20px 20px;
  transition: ${(props) => (props.sliding ? 'none' : 'transform 0.2s ease')};
  transform: ${(props) => {
    if (!props.sliding) return 'translateX(calc(0%))';
    if (props.direction === 'prev') return 'translateX(calc((-35%)))';
    return 'translateX(35%)';
  }};
`;

export const CarouselSlot = styled.div`
  flex: 1 0 10%;
  flex-basis: 10%;
  order: ${(props) => props.order};
  background: darkorange;
  text-align: center;
  color: white;
  height: 100px;
  max-width: 100px;
  min-width: 100px;
  margin: 0 16px 0 0;
`;

export default MultiDisplayCarousel;
