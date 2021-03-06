/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import OutfitItems from './OutfitItems';
import SimilarItems from './SimilarItems';

const StyledDiv = styled.div`
    color: #1f513f;
    margin: 50px 25px;
    overflow-x: hidden;
  `;

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    this.reRender();
  }

  reRender() {
    const outfit = [];
    const newOutfit = JSON.parse(localStorage.getItem('myOutfit'));
    outfit.push(JSON.parse(localStorage.getItem('myOutfit')));
    if (newOutfit !== null) {
      this.setState({
        products: newOutfit,
      });
    }
  }

  render() {
    const { id } = this.props;
    return (
      <StyledDiv className="relatedItems">
        <SimilarItems id={id} render={this.reRender} />
        <OutfitItems id={id} render={this.reRender} products={this.state.products} />
      </StyledDiv>
    );
  }
}

export default RelatedItems;
