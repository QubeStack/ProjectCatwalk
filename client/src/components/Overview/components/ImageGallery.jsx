import React from 'react';
import styled from 'styled-components';
import Thumbnails from './Thumbnails';

const PictureContainer = styled.div`
  display: grid;
  border: solid;
  padding: 5px;
  color: blue;

  grid-column-format: repeat(8, 1fr);
  width: 70vw;
  height: 70vh;
  `;

const StyledH4 = styled.h4`
  justify-self: center;
  grid-row: 30px;
  grid-column: span 8;`;

const ImageWrapper = styled.div`
  width: 70vw;
  height: 70vh;
  position: relative;`;

const ArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;`;

const MainImage = styled.img`
  justify-self: center;
  width: 70vw;
  height: 70vh;
  object-fit: scale-down;`;

const RightArrowButton = styled.img`
  border: solid;
  width: 20px;
  height: 30px;
  object-fit: scale-down;
  position: absolute;
  transform: scaleX(-1);`;

const LeftButton = styled.button`
  grid-column: 1 / 1;
  grid-row: 1 / 1;`;

const RightButton = styled.button`
grid-column: -1 / 1;
grid-row: 1 / 1;`;

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let { index } = this.state;
    const words = e.target.className.split(' ');
    // alert(words[(words.length -1)]);
    if (words[(words.length - 1)] === 'previous') {
      this.setState({ index: index -= 1 });
    } else if (words[(words.length - 1)] === 'next') {
      this.setState({ index: index += 1 });
    }
  }

  render() {
    const { photos, thumbnails } = this.props;
    const { index } = this.state;
    const thumbArr = thumbnails.slice(index, index + 7);
    return (
      <PictureContainer>
        {/* {index > 0 ? (
          <LeftButton className="previous" type="button" onClick={this.handleClick}>
            <ArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.  jpeg" alt="" />
          </LeftButton>
        ) : null} */}
        <ImageWrapper>
          <MainImage src={photos[index]} />
        </ImageWrapper>
        {/* {index < photos.length ? (
          <RightButton className="next" type="button" onClick={this.handleClick}>
            <RightArrowButton src="/Users/waydizzle/Desktop/HackReactor/ProjectCatwalk/client/src/components/Overview/components/left-arrow-icon-vector-21641382.jpeg" alt="" />
          </RightButton>
        ) : null}
        <Thumbnails thumbnails={thumbArr} /> */}
      </PictureContainer>
    );
  }
}

export default ImageGallery;
