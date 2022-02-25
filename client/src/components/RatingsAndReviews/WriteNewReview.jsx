import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal';

const Div = styled.div`
margin-right: 20px;
`;

const Button = styled.button`
  border-style: solid;
  border-color: #1f513f;
  margin-left: 10px;
  background-color: white;
  border-radius: 2px;
  &: hover {
    background-color: #1f513f;
    cursor: pointer;
    border-color: #f4f2ed;
    color: #f4f2ed;
  };
  &: active {
    background-color: white;
    color: black;
    border-color: #1f513f;
    -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
     -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
          box-shadow: inset 0px 0px 15px #c1c1c1;
  };
`;

class WriteNewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {

  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <Div className="newReview">
        {this.state.show ? <Modal handleClose={this.handleClose} />
          : (
            <Button type="button" onClick={() => this.setState({ show: true })}>
              New Review
            </Button>
          )}
      </Div>
    );
  }
}

export default WriteNewReview;
