import React from 'react';
import styled from 'styled-components';

const PictureContainer = styled.div`
  position: relative;
  bottom: -80%;
  right: -10%;
  height: 15%;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(${({ index }) => index}, 1fr);
  gap: 1rem;
  border: solid;
  color: transparent;
  justify-content: center;`;

const StyledH4 = styled.h4`
  justify-self: center;
  grid-column: span 8;`;

const ImageWrapper = styled.div`
  grid-column: span 1;`;

const ArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;`;

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
  }`;

const RightArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;
  transform: scaleX(-1);`;

const LeftButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  height: 10%;
  color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
  grid-column span 1;
  align-self: center;`;

const RightButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bold;
  height: 10%;
  font-size: 1rem;
  color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
  grid-column span 1;
  align-self: center;`;

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { thumbnails, index, handleThumbClick } = this.props;
    let leftHide = false;
    let rightHide = false;
    // if (index <= 7) {
    //   leftHide = true;
    // }
    // if (index >= thumbnails.length - 1 || thumbnails.length < 7) {
    //   rightHide = true;
    // }
    return (
      <PictureContainer index={thumbnails.length + 2}>
        {/* <StyledH4>Thumbnail Gallery</StyledH4> */}
        <LeftButton disabled={leftHide} hide={leftHide} type="button">
          &lt;
        </LeftButton>
        {thumbnails.map(
          (thumb, i) => (
            i === index
              ? (
                <ImageWrapper>
                  <Thumbnail onClick={() => handleThumbClick(i)} context={true} src={thumb} alt="" />
                </ImageWrapper>
              )
              : (
                <ImageWrapper>
                  <Thumbnail onClick={() => handleThumbClick(i)} context={false} src={thumb} alt="" />
                </ImageWrapper>
              )
          ),
        )}
        <RightButton disabled={rightHide} hide={rightHide} type="button">
          &gt;
        </RightButton>

      </PictureContainer>
    );
  }
}

export default Thumbnails;
