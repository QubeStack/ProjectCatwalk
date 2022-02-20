import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Body = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBody = styled.div`
  position: fixed;
  top: 25%;
  left: 25%;
  width: 700px;
  height: 1000px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
  filter: blur(0);
  opacity: 100%;
  visibility: visible;
  z-index: 11;
`;

const H2 = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  margin: 0;
`;

const Footer = styled.div`
  border-top: 1px solid #ccc;
  background: #eee;
  padding: 0.5rem 1rem;
 `;

const Button = styled.button`
  border: 0;
  background: #78f89f;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  line-height: 1;
 `;

class Modal extends React.Component {
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
      <>
        <Body />
        <ModalBody>
          <H2>MODAL</H2>
          <Footer>
            <Button type="button">Submit</Button>
          </Footer>
        </ModalBody>
      </>
    );
  }
}

export default Modal;
