import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Stars from './ReviewStars';

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

const PushRight = styled.div`
margin left: auto;
`;

const ModalBody = styled.div`
  position: fixed;
  top: 25%;
  left: 25%;
  width: 700px;
  height: 500px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
  filter: blur(0);
  opacity: 100%;
  visibility: visible;
  z-index: 11;
`;

const H2 = styled.div`
  color: black;
  margin-left: auto;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  margin: 0;
`;

const YesNo = styled.div`
font-size: 12px;
color: black;
font-weight: normal;
display: flex;
`;

const Characteristics = styled.div`
font-size: 12px;
color: black;
font-weight: normal;
display: flex;
`;

const Bold = styled.div`
font-weight: bold;
font-size: 12px;
color: black;
font-weight: bold;
`;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-size: 1px;
  border-style: solid;
  border-color: black;
`;

const Mandatory = styled.div`
font-size: 14px;
color: black;
  &:after {
    content: '*';
    color: red;
    font-size: 10px;
  }
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

    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentDidMount() {

  }

  onChangeValue(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  }

  render() {
    return (
      <>
        <Body />
        <ModalBody>
          <PushRight>
            <H2 type="button" onClick={this.props.handleClose}>[X]</H2>
          </PushRight>
          <Mandatory>Overall Rating</Mandatory>
          <Stars rating={0} />
          <Mandatory>Do you Recommend this Product?</Mandatory>
          <YesNo onChange={this.onChangeValue}>
            Yes
            <input type="radio" value="Yes" name="recommend" />
            No
            <input type="radio" value="No" name="recommend" />
          </YesNo>
          <Mandatory>Characteristics</Mandatory>

          <Bold> Size: {this.state.size ? this.state.size : "none selected"}</Bold>
          <Characteristics onChange={this.onChangeValue}>
            <RadioDiv>
              <div><input type="radio" value="A size too small" name="size" /></div>
              <div>1</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="1/2 a size too small" name="size" />
              <div>2</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Perfect" name="size" />
              <div>3</div>
            </RadioDiv>

          </Characteristics>
          <Footer>
            <Button type="button">Submit</Button>
          </Footer>
        </ModalBody>
      </>
    );
  }
}

export default Modal;
