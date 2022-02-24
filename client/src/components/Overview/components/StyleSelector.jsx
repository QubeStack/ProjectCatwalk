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
  object-fit: cover;
  &:hover, :focus{
    box-shadow: 2.5px 5px 2.5px #1F513F;
  }
  `;

const StyleCheck = styled.span`
  position: absolute;
  top: 5%;
  left: 5%;
  text-shadow: ${({ hide }) => (hide ? '' : '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb,  0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1),  0 0 5px rgba(0,0,0,.1),  0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2),  0 20px 20px rgba(0,0,0,.15);')};`;

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
                  <Style src={style.photos[0].thumbnail_url} alt="" onClick={() => this.handleSelect(style)} onKeyPress={() => this.handleSelect(style)}
                  tabIndex={0} />
                </CheckBox>
              ) : (<Style src={style.photos[0].thumbnail_url} alt="" onClick={() => this.handleSelect(style)}
              onKeyPress={() => this.handleSelect(style)}tabIndex={0} />)
            ))}
          </>
        ) : null}
      </StylesContainer>
    );
  }
}

export default StyleSelector;
