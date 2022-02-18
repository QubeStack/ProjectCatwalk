import React from 'react';
import styled from 'styled-components';

const PictureContainer = styled.div`
  display: grid;
  border: solid;
  color: orange;
  grid-row: 2 / 1;
  grid-column: 2 / 8;
  grid-column-format: repeat(8, 1fr);
  justify-self: center;`;

const StyledH4 = styled.h4`
  justify-self: center;
  grid-column: span 8;`;

const ImageWrapper = styled.div`
  display: grid;
  border: solid;
  justify-self: center;
  grid-column: 2 / 8 ;
  grid-row: 4 / 1;
  grid-column-format: repeat(10, 1fr);
  grid-gap: 5px;`;

const ArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;`;

const Thumbnail = styled.img`
  width: 80px;
  height: 120px;
  object-fit: fill;`;

const RightArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;
  transform: scaleX(-1);`;

const LeftButton = styled.button`
  grid-column: 1 / span 1;
  grid-row: 1 / 1;`;

const RightButton = styled.button`
  grid-column: 1 / span 1;
  grid-row: -1 / 1;`;

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { thumbnails } = this.props;
    return (
      <PictureContainer>
        {/* <StyledH4>Thumbnail Gallery</StyledH4> */}
        <ImageWrapper>
          <LeftButton type="button">
            <ArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.jpeg" alt="" />
          </LeftButton>
          {thumbnails.map((thumb) => (<Thumbnail src={thumb} alt="" />))}
          {/* <Thumbnail>Thumbnail 1</Thumbnail>
          <Thumbnail>Thumbnail 2</Thumbnail>
          <Thumbnail>Thumbnail 3</Thumbnail>
          <Thumbnail>Thumbnail 4</Thumbnail>
          <Thumbnail>Thumbnail 5</Thumbnail>
          <Thumbnail>Thumbnail 6</Thumbnail>
          <Thumbnail>Thumbnail 7</Thumbnail> */}
          <RightButton type="button">
            <RightArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.jpeg" alt="" />
          </RightButton>
        </ImageWrapper>
      </PictureContainer>
    );
  }
}

export default Thumbnails;
