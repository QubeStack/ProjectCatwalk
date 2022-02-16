import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StylesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;`;

const StyleBox = styled.img`
  border: solid;
  border-radius: 15px;
  width: 80px;
  height: 120px;
  object-fit: fill;`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      stylePhotos: [],
      selected: [],
    };

    // this.handleSelect = this.handleSelect.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.selectedStyle = this.selectedStyle.bind(this);
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      const { styles } = this.props;
      this.selectedStyle();
      if (styles) {
        // alert(JSON.stringify(styles));
        this.getPhotos(styles);
      }
    }
  }

  getPhotos(styles) {
    const photosArray = [];
    styles.forEach((e) => photosArray.push(e.photos));
    // alert(JSON.stringify(filtered));
    this.setState({
      stylePhotos: photosArray,
    });
  }

  selectedStyle() {
    const { selectedStyle } = this.props;
    this.setState({ selected: selectedStyle });
  }

  // handleSelect(style) {
  //   const { selected } = this.state;
  //   if (selected !== style) {
  //     this.setState({ selected: style });
  //   }
  // }

  render() {
    // const { styles } = this.state;
    const { stylePhotos } = this.state;
    // console.log(stylePhotos);
    // console.log(styles);
    return (
      <StylesContainer className="styles">
        {stylePhotos.map((style) => (
          <StyleBox src={style[0].thumbnail_url} alt="" />
        ))}
        {/* <StyleBox>Style 1</StyleBox>
        <StyleBox>Style 2</StyleBox>
        <StyleBox>Style 3</StyleBox>
        <StyleBox>Style 4</StyleBox> */}
      </StylesContainer>
    );
  }
}

export default StyleSelector;
