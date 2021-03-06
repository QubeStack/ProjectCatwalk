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
    let prevButton = <Button type="button" onClick={() => this.doSlide('left', this.state.position - 1)}> &lt; </Button>;

    let nextButton = <Button type="button" onClick={() => this.doSlide('right', this.state.position + 1)}> &gt; </Button>;

    if (this.state.position === 0 || this.props.products.length === 0) {
      prevButton = <> </>;
    }
    if (this.state.position === this.props.products.length + this.props.offset - 1 || this.props.products.length === 0) {
      nextButton = <> </>;
    }

    let addCard;
    if (this.props.addCard) {
      addCard = <CarouselItem id={this.props.id} product={{ id: -1 }} actionButton={this.props.actionButton} render={this.props.render} addCard />;
    } else {
      addCard = <> </>;
    }

    return (
      <HideOverflowContainer className="carousel">
        <CarouselContainer
          slide={this.state.slide}
          direction={this.state.direction}
          position={this.state.position}
        >
          {addCard}
          {this.props.products.map(
            (product) => <CarouselItem id={this.props.id} product={product} actionButton={this.props.actionButton} render={this.props.render} />,
          )}
        </CarouselContainer>
        <LeftButton>{prevButton}</LeftButton>
        <RightButton>{nextButton}</RightButton>
      </HideOverflowContainer>
    );
  }
}

const HideOverflowContainer = styled.div`
  margin: 0 0 120px 0;
  font-size: small;
  display: grid;
  grid-template-columns: 5% 90% 5%;
  grid-template-rows: 24px 24px 24px 24px 24px 24px;
`;

const CarouselContainer = styled.div`
  grid-column: 1/-1;
  grid-row: 1/11;
  position: absolute;
  display: flex;
  margin: 0 20px 20px 20px;
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

const Button = styled.button`
  background-color: #1f513f;
  color: white;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 10px;
  border-radius: 50%;
`;

const LeftButton = styled.div`
  grid-column: 1;
  grid-row: 5/6;
  z-index: 1;
`;

const RightButton = styled.div`
  grid-column: 3;
  grid-row: 5/6;
  z-index: 1;
`;

export default MultiDisplayCarousel;
