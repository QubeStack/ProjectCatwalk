import React from 'react';
import styled from 'styled-components';

const PictureContainer = styled.div`
  position: relative;
  bottom: -80%;
  right: -10%;
  height: 20%;
  width: 80%;
  display: flex;
  gap: 5%;
  border: solid;
  color: orange;
  justify-content: center;`;

const StyledH4 = styled.h4`
  justify-self: center;
  grid-column: span 8;`;

const ImageWrapper = styled.div`
  position: relative;
  bottom: -10%;
  height: 20%;
  width: 60%;
  display: grid;
  border: solid;
  justify-self: center;
  grid-column: 2 / 8 ;
  grid-row: 4 / 1;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 5px;`;

const ArrowButton = styled.img`
  width: 20px;
  height: 30px;
  object-fit: contain;`;

const Thumbnail = styled.img`
  width: 80px;
  height: 120px;
  object-fit: fill;
  border-radius: 10px;`;

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
  position: absolute;
  bottom: 45%;
  right: 95%;`;

const RightButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bold;
  height: 10%;
  font-size: 1rem;
  color: ${({ hide }) => (hide ? 'transparent' : '#1F513F')};
  position: absolute;
  bottom: 45%;
  right: 5%;`;

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { thumbnails, index } = this.props;
    return (
      <PictureContainer>
        {/* <StyledH4>Thumbnail Gallery</StyledH4> */}
        {/* <ImageWrapper> */}
        <LeftButton hide={false} type="button">
          &lt;
        </LeftButton>
        {thumbnails.map((thumb) => (<Thumbnail src={thumb} alt="" />))}
        <RightButton hide={false} type="button">
          &gt;
        </RightButton>
        {/* </ImageWrapper> */}
      </PictureContainer>
    );
  }
}

export default Thumbnails;
