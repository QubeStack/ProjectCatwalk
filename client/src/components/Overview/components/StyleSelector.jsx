import React from 'react';
import styled from 'styled-components';

const StylesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin-bottom: 20px;`;

const Style = styled.img`
  border: solid;
  border-radius: 15px;
  width: 100%;
  height: 110px;
  object-fit: fill;
  &:hover{
    color: white;
  }`;

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
      selected: [],
    };

    this.selectedStyle = this.selectedStyle.bind(this);
    this.setStyles = this.setStyles.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      const { styles } = this.props;
      this.selectedStyle();
      this.setStyles(styles);
    }
  }

  handleSelect(style) {
    const { selected } = this.state;
    const { changeStyle } = this.props;
    if (selected !== style) {
      changeStyle(style);
    }
  }

  setStyles(styles) {
    this.setState({ styles });
  }

  selectedStyle() {
    const { selectedStyle } = this.props;
    this.setState({ selected: selectedStyle });
  }

  render() {
    const {
      styles,
      selected,
    } = this.state;
    return (
      <StylesContainer className="styles">
        { styles && selected ? (
          <>
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
          </>
        ) : null}
      </StylesContainer>
    );
  }
}

export default StyleSelector;
