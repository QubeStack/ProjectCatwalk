import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal';

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
      <div className="newReview">
        {this.state.show ? <Modal handleClose={this.handleClose} />
          : (
            <button type="button" onClick={() => this.setState({ show: true })}>
              New Review
            </button>
          )}
      </div>
    );
  }
}

export default WriteNewReview;
