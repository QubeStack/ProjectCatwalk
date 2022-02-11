import React from 'react';
import styled from 'styled-components';

const PictureContainer = styled.div`
  display: grid;
  border: solid;
  color: orange;
  grid-column: span 4;
  grid-column-format: repeat(8, 1fr);
  justify-self: center;`;

const StyledH4 = styled.h4`
  justify-self: center;
  grid-column: span 8;`;

const ImageWrapper = styled.div`
  display: grid;
  border: solid;
  grid-column: span 8;
  grid-column-format: repeat(10, 1fr);`;

const ArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;`;

const Thumbnail = styled.div`
  grid-column: span 1;
  border: solid;
  color: black;`;

const RightArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;
  transform: scaleX(-1);`;

const LeftButton = styled.button`
  grid-column: 1 / span 1;`;

const RightButton = styled.button`
  grid-column: 9 / span 1;`;

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <PictureContainer>
        <StyledH4>Thumbnail Gallery</StyledH4>
        <ImageWrapper>
          <LeftButton type="button">
            <ArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.jpeg" alt="" />
          </LeftButton>
          <Thumbnail>Thumbnail 1</Thumbnail>
          <Thumbnail>Thumbnail 2</Thumbnail>
          <Thumbnail>Thumbnail 3</Thumbnail>
          <Thumbnail>Thumbnail 4</Thumbnail>
          <Thumbnail>Thumbnail 5</Thumbnail>
          <Thumbnail>Thumbnail 6</Thumbnail>
          <Thumbnail>Thumbnail 7</Thumbnail>
          <RightButton type="button">
            <RightArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.jpeg" alt="" />
          </RightButton>
        </ImageWrapper>
      </PictureContainer>
    );
  }
}

export default Thumbnails;
