import React from 'react';
import axios from 'axios';
import GlobalCSS from '../global.css';
import QABody from './QandA/QABody';
import RelatedItems from './RelatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import Overview from './Overview/Overview';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      product: [],
      styles: [],
    };

    this.ratingsRef = null;
    this.scrollTo = this.scrollTo.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.getProduct();
    this.getStyles();
  }

  getReviews() {
    const { id } = this.props;
    axios.get('/api/product/reviews', {
      params: {
        product_id: id,
      },
    })
      .then((results) => {
        this.setState({ reviews: results.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProduct() {
    const { id } = this.props;
    axios.get('/api/product', { params: { product_id: id } })
      .then((results) => {
        this.setState({ product: results.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getStyles() {
    const { id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/styles',
      params: {
        product_id: id,
      },
    })
      .then((response) => {
        const stylesArray = response.data.results;
        this.setState({
          styles: stylesArray,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  scrollTo() {
    this.ratingsRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  render() {
    const { id } = this.props;
    const { reviews, product, styles } = this.state;
    return (
      <div>
        <Header />
        <GlobalCSS />
        <Overview
          id={id}
          scroll={this.scrollTo}
          reviews={reviews}
          product={product}
          styles={styles}
        />
        <RatingsAndReviews setRef={(el) => (this.ratingsRef = el)} />
        <QABody product={product} id={id} />
        <RelatedItems key={id} id={id} />
      </div>
    );
  }
}

export default App;
