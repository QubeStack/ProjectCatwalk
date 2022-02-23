import React from 'react';
import styled from 'styled-components';

const PictureContainer = styled.div`
  position: relative;
  bottom: -80%;
  right: -10%;
  height: ${({ zoomed }) => (zoomed ? '15%' : '10%')};
  width: 80%;
  display: grid;
  grid-template-columns: repeat(${({ index }) => index}, 1fr);
  gap: 1rem;
  border: solid;
  color: transparent;
  justify-content: center;`;

const ImageWrapper = styled.div`
  grid-column: span 1;
  align-content: center;
  position: relative;`;

const Thumbnail = styled.img`
  border: solid;
  border-color: ${({ context }) => (context ? 'white' : 'transparent')};
  height: 90%;
  width: 100%;
  object-fit: fill;
  border-radius: 10px;
  opacity: ${({ context }) => (context ? '1' : '.5')};
  &:hover {
    opacity: 1;
  };`;

const Dot = styled.div`
  position: absolute;
  border: solid;
  right: 40%;
  bottom: -50%;
  border-color: ${({ context }) => (context ? 'white' : 'transparent')};
  background-color: white;
  border-radius: 50%;
  height: 25%;
  width: 18%;
  opacity: ${({ context }) => (context ? '1' : '.5')};
  &:hover {
    opacity: 1;
  };`;

const LeftButton = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  height: 10%;
  color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
  grid-column span 1;
  align-self: center;
  &:hover{
    cursor: pointer;
  };`;

const RightButton = styled.button`
  position: relative;
  bottom: ${({ zoomed }) => (zoomed ? '-74%' : '0%')};
  background-color: transparent;
  border: none;
  font-weight: bold;
  height: 10%;
  font-size: 1rem;
  color: ${({ hide, zoomed }) => (zoomed ? (hide ? 'transparent' : 'white') : (hide ? 'transparent' : '#1F513F'))};
  grid-column span 1;
  align-self: center;
  &:hover{
    cursor: pointer;
  };`;

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      thumbnails,
      index,
      handleThumbClick,
      zoomed,
    } = this.props;
    let leftHide = false;
    let rightHide = false;
    let currentThumbs = [];
    if (thumbnails) {
      if (index <= 7) {
        leftHide = true;
        currentThumbs = thumbnails.slice(0, 7);
      }
      if (index >= thumbnails.length - 1 || thumbnails.length < 7) {
        rightHide = true;
      }
      if (index > 7) {
        currentThumbs = thumbnails.slice(index - 7, index);
      }
    }
    return (
      <div>
        {thumbnails ? (
          <PictureContainer index={thumbnails.length <= 7 ? thumbnails.length + 2 : 9} className="Thumbnails">
            <LeftButton disabled={leftHide} hide={leftHide} type="button">
              &lt;
            </LeftButton>
            {currentThumbs.map(
              (thumb, i) => (
                <ImageWrapper>
                  {zoomed ? (<Dot onClick={() => handleThumbClick(i)} context={i === index} />) : (<Thumbnail onClick={() => handleThumbClick(i)} context={i === index} src={thumb} alt="" />)}
                </ImageWrapper>
              ),
            )}
            <RightButton disabled={rightHide} hide={rightHide} zoomed={zoomed} type="button">
              &gt;
            </RightButton>
          </PictureContainer>
        ) : null}
      </div>
    );
  }
}

export default Thumbnails;
