import React from 'react';
import styled, { keyframes } from 'styled-components';
import Thumbnails from './Thumbnails';

const expand = keyframes`
  from {
    position: relative;
    background-color: #f4f2ed;
    grid-column: span 7;
    width: 70vw;
    z-index: auto;
  }

  to {
    position: absolute;
    background-color: black;
    grid-column: span 10;
    width: 95vw;
    z-index: 1;
  }`;

const contract = keyframes`
  from {
    position: absolute;
    background-color: black;
    grid-column: span 10;
    width: 95vw;
    z-index: 1;
  }

  to {
    position: relative;
    background-color: #f4f2ed;
    grid-column: span 7;
    width: 70vw;
    z-index: auto;
  }`;

const PictureContainer = styled.div`
  display: flex;
  position: ${({ zoomed }) => (zoomed ? 'absolute' : 'relative')};
  border-radius: 5px;
  background-color: ${({ zoomed }) => (zoomed ? 'black' : '#f4f2ed')};
  grid-column: ${({ zoomed }) => (zoomed ? 'span 10' : 'span 7')};
  width: ${({ zoomed }) => (zoomed ? '95vw' : '70vw')};
  z-index: ${({ zoomed }) => (zoomed ? '1' : 'auto')};
  height: 88vh;
  margin: 5px;
  animation-name: ${({ zoomed, firstClick }) => (firstClick ? (zoomed ? expand : contract) : 'none')};
  animation-duration: 1.5s;`;

const MainImage = styled.img`

  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  &:hover {
    cursor: zoom-in;
  }`;

const LeftButton = styled.button`
background-color: transparent;
border: none;
font-weight: bold;
font-size: 2rem;
height: 10%;
color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
position: absolute;
bottom: 45%;
right: 95%;
&:hover{
  cursor: pointer;
};`;

const RightButton = styled.button`
background-color: transparent;
border: none;
font-weight: bold;
height: 10%;
font-size: 2rem;
color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
position: absolute;
bottom: 45%;
right: 5%;
&:hover{
  cursor: pointer;
}`;

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      zoomed: false,
      firstClick: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }

  handleClick(e) {
    let { index } = this.state;
    const words = e.target.className.split(' ');
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
    this.setState({ zoomed: !zoomed, firstClick: true });
  }

  render() {
    const { photos, thumbnails } = this.props;
    const { index, zoomed, firstClick } = this.state;
    // const thumbArr = thumbnails.slice(index, index + 7);
    let hideLeft = true;
    let hideRight = false;
    if (photos) {
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
    }
    return (

      <PictureContainer zoomed={zoomed} firstClick={firstClick} className="ImageGallery">
        { photos && thumbnails ? (
          <>
            <MainImage src={photos[index]} onClick={this.handleZoom} tabIndex="0" alt="" />
            <LeftButton disabled={hideLeft} hide={hideLeft} className="previous" type="button" onClick={this.handleClick}>
              &lt;
            </LeftButton>
            <RightButton disabled={hideRight} hide={hideRight} className="next" type="button" onClick={this.handleClick}>
              &gt;
            </RightButton>
            <Thumbnails
              handleThumbClick={this.handleThumbClick}
              index={index}
              thumbnails={thumbnails}
              zoomed={zoomed}
            />
          </>
        ) : null}
      </PictureContainer>
    );
  }
}

export default ImageGallery;
