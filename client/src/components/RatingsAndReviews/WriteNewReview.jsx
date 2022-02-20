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
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.state.show ? <Modal />
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
