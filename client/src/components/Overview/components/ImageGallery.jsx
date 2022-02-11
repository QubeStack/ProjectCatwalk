import React from 'react';
import styled from 'styled-components';
import Thumbnails from './Thumbnails';

const PictureContainer = styled.div`
  display: grid;
  border: solid;
  padding: 5px;
  color: blue;
  grid-column: span 4;
  grid-column-format: repeat(8, 1fr);`;

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

const MainImage = styled.div`
  grid-column: 2 / span 7;
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

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <PictureContainer>
        <StyledH4>Image Gallery</StyledH4>
        <ImageWrapper>
          <LeftButton type="button">
            <ArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.jpeg" alt="" />
          </LeftButton>
          <MainImage>Big Picture</MainImage>
          <RightButton type="button">
            <RightArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.jpeg" alt="" />
          </RightButton>
        </ImageWrapper>
        <Thumbnails />
      </PictureContainer>
    );
  }
}

export default ImageGallery;
