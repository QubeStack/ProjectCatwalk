/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import CarouselItem from './CarouselItem';

class MultiDisplayCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      direction: 'right',
      slide: false,
    };
  }

  doSlide(direction, position) {
    let newPosition = position;
    if (position < 0) {
      newPosition = 0;
    }
    this.setState({
      slide: true,
      direction,
    });

    setTimeout(() => {
      this.setState({
        direction: undefined,
        position: newPosition,
      });
    }, 100);
  }

  render() {
    let prevButton = <button type="button" onClick={() => this.doSlide('left', this.state.position - 1)}> &lt; </button>;

    let nextButton = <button type="button" onClick={() => this.doSlide('right', this.state.position + 1)}> &gt; </button>;

    if (this.state.position === 0) {
      prevButton = <> </>;
    }
    if (this.state.position === this.props.products.length + this.props.offset - 1) {
      nextButton = <> </>;
    }

    let addCard;
    if (this.props.addCard) {
      addCard = <CarouselItem id={this.props.id} product={{ id: -1 }} actionButton={this.props.actionButton} render={this.props.render} addCard />;
    } else {
      addCard = <> </>;
    }

    return (
      <HideOverflowContainer>
        <CarouselContainer
          slide={this.state.slide}
          direction={this.state.direction}
          position={this.state.position}
        >
          {addCard}
          {this.props.products.map(
            (product) => <CarouselItem product={product} actionButton={this.props.actionButton} render={this.props.render} />,
          )}
        </CarouselContainer>
        <LeftButton>{prevButton}</LeftButton>
        <RightButton>{nextButton}</RightButton>
      </HideOverflowContainer>
    );
  }
}

const HideOverflowContainer = styled.div`
  overflow: hidden;
  font-size: small;
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-rows: auto;
`;

const CarouselContainer = styled.div`
  grid-column: 1/-1;
  grid-row: 1/11;
  display: flex;
  margin: 0 0 20px 20px;
  transition: 'transform 0.2s ease';
  transform: ${(props) => {
    if (props.direction === 'right') {
      return `translateX(-${180 * props.position + 1}px)`;
    }
    if (props.direction === 'left') {
      return `translateX(-${180 * props.position - 1}px)`;
    }
    return `translateX(-${180 * props.position}px)`;
  }
}};
`;

const LeftButton = styled.div`
  grid-column: 1;
  grid-row: 4;
  z-index: 2;
`;

const RightButton = styled.div`
  grid-column: 25;
  grid-row: 4;
  z-index: 2;
`;

export default MultiDisplayCarousel;
