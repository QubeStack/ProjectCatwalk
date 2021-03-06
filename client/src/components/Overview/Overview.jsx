import React from 'react';
import styled from 'styled-components';
import ImageGallery from './components/ImageGallery';
import ProductInformation from './components/ProductInformation';

const StyledContainer = styled.div`
  display: grid;
  padding: 5px;
  margin: 1em;
  height: 90vh;
  gap: 1rem;
  grid-template-columns: repeat(10, 1fr);`;

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // product: [],
      // styles: [],
      id: [],
      selectedStyle: [],
      stylePhotos: [],
      styleThumbnails: [],
      favorited: false,
      zoomed: false,
    };

    this.getStyles = this.getStyles.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.checkFav = this.checkFav.bind(this);
    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }

  componentDidUpdate(previousprops) {
    if (previousprops !== this.props) {
      //console.log('Overview');
      const { product, styles } = this.props;
      if (styles) {
        this.getStyles(styles);
        this.checkFav(product);
        // this.props.render();
      }
    }
  }

  handleZoom() {
    const { zoomed } = this.state;
    this.setState({ zoomed: !zoomed });
  }

  getStyles(styles) {
    const defaultStyle = styles[0];
    this.setState({
      selectedStyle: defaultStyle,
    });
    const { selectedStyle } = this.state;
    if (selectedStyle) {
      this.getPhotos(selectedStyle.photos);
    }
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
        styleThumbnails: thumbnailArray, stylePhotos: photosArray,
      });
    }
  }

  checkFav(product) {
    try {
      const outfit = JSON.parse(localStorage.getItem('myOutfit'));
      for (let i = 0; i < outfit.length; i += 1) {
        if (outfit[i].id === product.id) {
          this.setState({ favorited: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  addFav() {
    const { product } = this.props;
    if (product) {
      try {
        if (localStorage.getItem('myOutfit') === null) {
          localStorage.setItem('myOutfit', JSON.stringify([product]));
        } else {
          let outfit = JSON.parse(localStorage.getItem('myOutfit'));
          if (!Array.isArray(outfit)) {
            outfit = [outfit];
          }
          if (outfit.every((item) => item.id !== product.id)) {
            outfit.push(product);
          }
          localStorage.setItem('myOutfit', JSON.stringify(outfit));
          this.setState({ favorited: true });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  removeFav() {
    const { product } = this.props;
    if (product) {
      try {
        let outfit = JSON.parse(localStorage.getItem('myOutfit'));
        if (!Array.isArray(outfit)) {
          outfit = [outfit];
        }
        const newOutfit = outfit.filter((item) => item.id !== product.id);
        localStorage.setItem('myOutfit', JSON.stringify(newOutfit));
        this.setState({ favorited: false });
      } catch (err) {
        console.log(err);
      }
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
      favorited,
      selectedStyle,
      styleThumbnails,
      stylePhotos,
      zoomed,
    } = this.state;

    const { scroll, id, reviews, product, styles } = this.props;

    return (
      <StyledContainer>
        { product && selectedStyle && styles ? (
          <>
            <ImageGallery photos={stylePhotos} thumbnails={styleThumbnails} handleZoom={this.handleZoom} />
            <ProductInformation
              product={product}
              selectedStyle={selectedStyle}
              styles={styles}
              changeStyle={this.changeStyle}
              scroll={scroll}
              id={id}
              favorited={favorited}
              addFav={this.addFav}
              removeFav={this.removeFav}
              reviews={reviews}
              zoomed={zoomed}
            />
          </>
        ) : null}
      </StyledContainer>
    );
  }
}

export default Overview;
