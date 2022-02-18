import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ImageGallery from './components/ImageGallery';
import ProductInformation from './components/ProductInformation';

const StyledContainer = styled.div`
  display: grid;
  border: solid;
  padding: 5px;
  margin: 1em;
  gap: 1rem;
  grid-template-columns: repeat(10, 1fr);`;

const StyledH2 = styled.h2`
  justify-self: center;
  grid-column: span 10;`;

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      styles: [],
      selectedStyle: [],
      stylePhotos: [],
      styleThumbnails: [],
    };

    this.getProducts = this.getProducts.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('/api/products')
      .then((results) => {
        // const productIDs = [];
        // for (let i = 0; i < results.data.length; i += 1) {
        //   productIDs.push(results.data[i].id);
        // }
        // alert(JSON.stringify(results.data));
        this.getStyles(results.data[0].id);
        this.setState({ product: results.data[0] });
        //  console.log(productIDs);
      });
  }

  getStyles(id) {
    axios({
      method: 'get',
      url: '/api/product/styles',
      params: {
        product_id: id,
      },
    })
      .then((response) => {
        const stylesArray = response.data.results;
        const defaultStyle = stylesArray[0];
        this.setState({
          styles: stylesArray, selectedStyle: defaultStyle,
        });
        const { selectedStyle } = this.state;
        if (selectedStyle) {
          this.getPhotos(selectedStyle.photos);
        }
      });
  }

  getPhotos(style) {
    if (style) {
      const thumbnailArray = [];
      const photosArray = [];
      for (let i = 0; i < style.length; i += 1) {
        thumbnailArray.push(style[i].thumbnail_url);
        photosArray.push(style[i].url);
      }
      this.setState({
        styleThumbnails: thumbnailArray, stylePhotos: photosArray
      });
    }
  }

  changeStyle(style) {
    if (style) {
      this.getPhotos(style.photos);
      this.setState({
        selectedStyle: style,
      });
    }
  }

  render() {
    const {
      product,
      selectedStyle,
      styles,
      styleThumbnails,
      stylePhotos,
    } = this.state;

    return (
      <StyledContainer>
        { product && selectedStyle && styles ? (
          <>
            <StyledH2>Product Overview</StyledH2>
            <ImageGallery photos={stylePhotos} thumbnails={styleThumbnails} />
            <ProductInformation
              product={product}
              selectedStyle={selectedStyle}
              styles={styles}
              changeStyle={this.changeStyle}
            />
          </>
        ) : null}
      </StyledContainer>
    );
  }
}

export default Overview;
