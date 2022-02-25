/* eslint-disable no-promise-executor-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-loop-func */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MultiDisplayCarousel from './MultiDisplayCarousel';

class SimilarItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/product/related',
      params: {
        product_id: this.props.id,
      },
    })
      .then((results) => {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        (async () => {
          try {
            for (let i = 0; i < results.data.length; i += 1) {
              await sleep(1000);
              axios({
                method: 'get',
                url: '/api/product',
                params: {
                  product_id: results.data[i],
                },
              })
                .then((product) => {
                  const list = this.state.products;
                  list.push(product.data);
                  this.setState({
                    products: list,
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          } catch (error) {
            console.log(error);
          }
        })();
      },
        // Promise.all(results.data.map((result) => (
        //   axios({
        //     method: 'get',
        //     url: '/api/product',
        //     params: {
        //       product_id: result,
        //     },
        //   })
        //     .catch(() => {
        //     })
        // )))
        //   .then((products) => {
        //     const data = products.map((product) => product.data);
        //     this.setState({
        //       products: data,
        //     });
        //   })
        //   .catch(() => {
        //   });
      // })
      // .catch(() => {
      // });
      );
  }

  render() {
    return (
      <div className="similarItems">
        <Label>Related Items</Label>
        <MultiDisplayCarousel id={this.props.id} render={this.props.render} products={this.state.products} actionButton="+" offset={0} />
      </div>
    );
  }
}

const Label = styled.div`
  margin: 0 35px;
`;

export default SimilarItems;
