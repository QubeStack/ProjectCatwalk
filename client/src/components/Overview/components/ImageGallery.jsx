import React from 'react';
import styled from 'styled-components';
import Thumbnails from './Thumbnails';

const PictureContainer = styled.div`
  display: flex;
  position: ${({ zoomed }) => (zoomed ? 'absolute' : 'relative')};
  border-radius: 5px;
  background-color: ${({ zoomed }) => (zoomed ? 'black' : '#f4f2ed')};
  grid-column: ${({ zoomed }) => (zoomed ? 'span 10' : 'span 7')};
  width: ${({ zoomed }) => (zoomed ? '95vw' : '70vw')};
  z-index: ${({ zoomed }) => (zoomed ? '1' : 'auto')};
  height: 88vh;
  margin: 5px;`;

const StyledH4 = styled.h4`
  justify-self: center;
  grid-row: 30px;
  grid-column: span 8;`;

const ImageWrapper = styled.div`
  width: 70vw;
  height: 88%;
  position: relative;`;

const ArrowButton = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  `;

const MainImage = styled.img`

  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  &:hover {
    cursor: zoom-in;
  }`;

const RightArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: scale-down;
  transform: scaleX(-1);`;

const LeftButton = styled.button`
background-color: transparent;
border: none;
font-weight: bold;
font-size: 2rem;
height: 10%;
color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
position: absolute;
bottom: 45%;
right: 95%;`;

const RightButton = styled.button`
background-color: transparent;
border: none;
font-weight: bold;
height: 10%;
font-size: 2rem;
color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
position: absolute;
bottom: 45%;
right: 5%;`;

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      zoomed: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
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

  handleThumbClick(index) {
    this.setState({ index });
  }

  handleZoom() {
    const { zoomed } = this.state;
    this.setState({ zoomed: !zoomed });
  }

  render() {
    const { photos, thumbnails } = this.props;
    const { index, zoomed } = this.state;
    // const thumbArr = thumbnails.slice(index, index + 7);
    let hideLeft = true;
    let hideRight = false;
    if (index <= 0) {
      hideLeft = true;
    } else if (index > 0) {
      hideLeft = false;
    }
    if (index < photos.length - 1) {
      hideRight = false;
    } else if (index >= photos.length - 1) {
      hideRight = true;
    }
    return (
      <PictureContainer zoomed={zoomed}>
        {/* <ImageWrapper> */}
        <MainImage src={photos[index]} onClick={this.handleZoom} />
        {/* </ImageWrapper> */}
        {/* {index > 0 ? ( */}
        <LeftButton disabled={hideLeft} hide={hideLeft} className="previous" type="button" onClick={this.handleClick}>
          &lt;
        </LeftButton>
        {/* ) : <> </>} */}
        {/* {index < photos.length - 1 ? ( */}
        <RightButton disabled={hideRight} hide={hideRight} className="next" type="button" onClick={this.handleClick}>
          &gt;
        </RightButton>
        {/* ) : <> </>} */}
        <Thumbnails handleThumbClick={this.handleThumbClick} index={index} thumbnails={thumbnails} />
      </PictureContainer>
    );
  }
}

export default ImageGallery;
