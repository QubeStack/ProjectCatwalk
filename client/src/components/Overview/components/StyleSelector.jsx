import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StylesContainer = styled.div`
  display: grid;
  grid-column-template: repeat(4, 1fr);
  grid-auto-flow: column;
  grid-gap: 5px;`;

const StyleBox = styled.div`
  border: solid;`;

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
    };
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      const { id } = this.props;
      // alert(id);
      axios({
        method: 'get',
        url: '/api/product/styles',
        params: {
          product_id: id,
        },
      })
        .then((response) => {
          const photoArray = response.data.results;
          const filtered = [];
          photoArray.forEach((e) => filtered.push(e.photos));
          //alert(JSON.stringify(filtered));
          this.setState({
            styles: response.data.results[0],
          });
        });
    }
  }

  render() {
    const { styles } = this.state;
    console.log(styles);
    return (
      <StylesContainer>
        {/* {styles.map((style) => (
          <StyleBox>{style}</StyleBox>
        ))} */}
        <StyleBox>Style 1</StyleBox>
        <StyleBox>Style 2</StyleBox>
        <StyleBox>Style 3</StyleBox>
        <StyleBox>Style 4</StyleBox>
      </StylesContainer>
    );
  }
}

export default StyleSelector;
