/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let featureArray;
    let featureArray2;
    let allFeatures;

    if (this.props.product.features !== undefined
      && this.props.currentProduct.features !== undefined) {
      featureArray = this.props.product.features.map((feature) => feature.feature);
      featureArray2 = this.props.currentProduct.features.map((feature) => feature.feature);
      allFeatures = featureArray.concat(featureArray2);
    }

    const uniqueFeatures = Array.from(new Set(allFeatures));
    return (
      <Modal className="modal">
        <Content>
          <CloseButton onClick={this.props.handleClose}>&times;</CloseButton>
          <ModalTitle>Comparing</ModalTitle>
          <Table>
            <TR>
              <th>{this.props.product.name}</th>
              <th> </th>
              <th>{this.props.currentProduct.name}</th>
            </TR>
            {uniqueFeatures.map((feature) => {
              let productFeature = '';
              let currentProductFeature = '';
              this.props.product.features.forEach((one) => {
                if (one.feature === feature) {
                  if (one.value === null) {
                    productFeature = '\u2713';
                  } else {
                    productFeature = one.value;
                  }
                }
              });
              this.props.currentProduct.features.forEach((two) => {
                if (two.feature === feature) {
                  currentProductFeature = two.value;
                }
              });
              return (
                <TR2>
                  <td>{productFeature}</td>
                  <td>{feature}</td>
                  <td>{currentProductFeature}</td>
                </TR2>
              );
            })}
          </Table>
        </Content>
      </Modal>
    );
  }
}

const Modal = styled.div`
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  position: absolute;
  z-index: 2;
  width: 250px;
  height: 234px;
  overflow: auto;
  transform: translate(-50px, -10px);
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.8);
`;

const Content = styled.div`
  width: 250px;
  height: 234px;
  display: grid;
  color: white;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: repeat(auto-fit, 20%);
`;

const CloseButton = styled.div`
  color: #aaaaaa;
  grid-row: 1;
  grid-column: 5;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  &: hover {
    cursor: pointer;
    color: black;
  }
`;

const ModalTitle = styled.div`
  grid-row: 1;
  grid-column: 3/4;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  grid-row: 2/-1;
  grid-column: 1/-1;
  text-align: center;
  border-collapse: collapse;
`;

const TR = styled.tr`
  border: 1px solid white;
  font-size: small;
  color: white;
`;

const TR2 = styled.tr`
  font-size: small;
  color: white;
`;

export default Modals;
