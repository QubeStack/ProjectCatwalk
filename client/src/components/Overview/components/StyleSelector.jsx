import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StylesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;`;

const Style = styled.img`
  border: solid;
  border-radius: 15px;
  width: 80px;
  height: 120px;
  object-fit: fill;`;

const StyleCheck = styled.span`
  position: absolute;
  top: 5%;
  left: 5%;`;

const CheckBox = styled.div`
  display: grid;
  position: relative;`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      stylePhotos: [],
      selected: [],
    };

    this.getPhotos = this.getPhotos.bind(this);
    this.selectedStyle = this.selectedStyle.bind(this);
    this.setStyles = this.setStyles.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      const { styles } = this.props;
      this.selectedStyle();
      // if (styles) {
      // alert(JSON.stringify(styles));
      this.getPhotos(styles);
      this.setStyles(styles);
      // }
    }
  }

  handleSelect(style) {
    const { selected } = this.state;
    const { changeStyle } = this.props;
    if (selected !== style) {
      // alert(JSON.stringify(style));
      // this.setState({ selected: style });
      changeStyle(style);
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

  setStyles(styles) {
    this.setState({ styles });
  }

  selectedStyle() {
    const { selectedStyle } = this.props;
    this.setState({ selected: selectedStyle });
  }

  render() {
    // const { styles } = this.state;
    const { stylePhotos, styles, selected } = this.state;
    // const { styles } = this.state;
    // const { selected } = this.state;
    // console.log(stylePhotos);
    // console.log(styles);
    return (
      <>
      { styles && selected ? (
        <StylesContainer className="styles">
        {styles.map((style) => (
          selected === style ? (
            <CheckBox>
              <StyleCheck>
                &#10003;
              </StyleCheck>
              <Style src={style.photos[0].thumbnail_url} alt="" onClick={() => this.handleSelect(style)} />
            </CheckBox>
          ) : (<Style src={style.photos[0].thumbnail_url} alt="" onClick={() => this.handleSelect(style)} />)
        ))}
      </StylesContainer>
      ) : null}
      </>
    );
  }
}

export default StyleSelector;
