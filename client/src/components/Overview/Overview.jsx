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
      style: [],
      selectedStyle: [],
    };

    this.getProducts = this.getProducts.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
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
      });
  }

  changeStyle(style) {
    this.setState({ selectedStyle: style });
  }

  render() {
    const { product } = this.state;
    const { selectedStyle } = this.state;
    const { styles } = this.state;
    // console.log(products.id);
    return (
      <StyledContainer>
        <StyledH2>Product Overview</StyledH2>
        <ImageGallery />
        <ProductInformation
          product={product}
          selectedStyle={selectedStyle}
          styles={styles}
          changeStyle={this.changeStyle}
        />
      </StyledContainer>
    );
  }
}

export default Overview;
