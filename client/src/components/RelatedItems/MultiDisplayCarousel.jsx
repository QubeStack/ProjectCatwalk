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
      slide: true,
      direction,
      position
    });

    setTimeout(() => {
      this.setState({
        slide: false
      });
    }, 25);
  }


  render() {
    return (
      <>
        <CarouselContainer slide={this.state.slide} direction={this.state.direction} position={this.state.position}>
          <CarouselSlot>Item 1</CarouselSlot>
          <CarouselSlot>Item 2</CarouselSlot>
          <CarouselSlot>Item 3</CarouselSlot>
          <CarouselSlot>Item 4</CarouselSlot>
          <CarouselSlot>Item 5</CarouselSlot>
          <CarouselSlot>Item 6</CarouselSlot>
          <CarouselSlot>Item 7</CarouselSlot>
          <CarouselSlot>Item 8</CarouselSlot>
          <CarouselSlot>Item 9</CarouselSlot>
          <CarouselSlot>Item 10</CarouselSlot>
        </CarouselContainer>
        <button onClick={() => this.doSlide('left', this.state.position - 1)}>Prev</button>
        <button onClick={() => this.doSlide('right', this.state.position + 1)}>Next</button>
      </>
    );
  }
}

const CarouselContainer = styled.div`
  display: flex;
  margin: 0 0 20px 20px;
  transition: 'transform 1s ease';
  transform: ${(props) => {
    return "translateX(-" + (15 * props.position) + "%)";
    }
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
