import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

// import Loader from '../Loader';
import ImageGallery from './components/ImageGallery';
import ProductInformation from './components/ProductInformation';

const StyledContainer = styled.div`
  display: grid;
  border: solid;
  padding: 5px;
  margin: 1em;
  height: 90vh;
  gap: 1rem;
  grid-template-columns: repeat(10, 1fr);`;

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
    const { id } = this.props;
    axios.get('/api/product', { params: { product_id: id } })
      .then((results) => {
        this.getStyles(results.data.id);
        this.setState({ product: results.data });
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

    const { scroll, id } = this.props;

    // const renderLoader = () => <StyledLoader>Loading...</StyledLoader>;

    return (
      <StyledContainer>
        { product && selectedStyle && styles ? (
          <>
            <ImageGallery photos={stylePhotos} thumbnails={styleThumbnails} />
            <ProductInformation
              product={product}
              selectedStyle={selectedStyle}
              styles={styles}
              changeStyle={this.changeStyle}
              scroll={scroll}
              id={id}
            />
          </>
        ) : null}
      </StyledContainer>
    );
  }
}

export default Overview;
