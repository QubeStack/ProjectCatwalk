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
  border-radius: 10px;
  background-color: ${({ zoomed }) => (zoomed ? 'black' : 'white')};
  grid-column: ${({ zoomed }) => (zoomed ? 'span 10' : 'span 7')};
  width: ${({ zoomed }) => (zoomed ? '95vw' : '70vw')};
  z-index: ${({ zoomed }) => (zoomed ? '1' : 'auto')};
  height: 88vh;
  margin: 5px;
  animation-name: ${({ zoomed, firstClick }) => (firstClick ? (zoomed ? expand : contract) : 'none')};
  animation-duration: 1.5s;
  `;

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
text-shadow: ${({ hide }) => (hide ? '' : '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb,  0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1),  0 0 5px rgba(0,0,0,.1),  0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2),  0 20px 20px rgba(0,0,0,.15);')};
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
text-shadow: ${({ hide }) => (hide ? '' : '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb,  0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1),  0 0 5px rgba(0,0,0,.1),  0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2),  0 20px 20px rgba(0,0,0,.15);')};
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
      <PictureContainer zoomed={zoomed} firstClick={firstClick}>
        <MainImage src={photos[index]} onClick={this.handleZoom} onKeyPress={this.handleZoom} tabIndex={0} alt="" />
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
      </PictureContainer>
    );
  }
}

export default ImageGallery;
