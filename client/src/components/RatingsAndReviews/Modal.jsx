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
`;

// border-size: 1px;
// border-style: solid;
// border-color: black;

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
        <Body className="modal" />
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
            <RadioDiv>
              <input type="radio" value="1/2 a size too big" name="size" />
              <div>4</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="A size too big" name="size" />
              <div>5</div>
            </RadioDiv>
          </Characteristics>

          <Bold> Width: {this.state.width ? this.state.width : "none selected"}</Bold>
          <Characteristics onChange={this.onChangeValue}>
            <RadioDiv>
              <div><input type="radio" value="Too narrow" name="width" /></div>
              <div>1</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Slightly narrow" name="width" />
              <div>2</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Perfect" name="width" />
              <div>3</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Slightly wide" name="width" />
              <div>4</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Too wide" name="width" />
              <div>5</div>
            </RadioDiv>
          </Characteristics>

          <Bold> Comfort: {this.state.comfort ? this.state.comfort : "none selected"}</Bold>
          <Characteristics onChange={this.onChangeValue}>
            <RadioDiv>
              <div><input type="radio" value="Uncomfortable" name="comfort" /></div>
              <div>1</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Slightly uncomfortable" name="comfort" />
              <div>2</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Ok" name="comfort" />
              <div>3</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Comfortable" name="comfort" />
              <div>4</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Perfect" name="comfort" />
              <div>5</div>
            </RadioDiv>
          </Characteristics>

          <Bold> Quality: {this.state.quality ? this.state.quality : "none selected"}</Bold>
          <Characteristics onChange={this.onChangeValue}>
            <RadioDiv>
              <div><input type="radio" value="Poor" name="quality" /></div>
              <div>1</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Below average" name="quality" />
              <div>2</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="What I expected" name="quality" />
              <div>3</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Pretty great" name="quality" />
              <div>4</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Perfect" name="quality" />
              <div>5</div>
            </RadioDiv>
          </Characteristics>

          <Bold> Length: {this.state.length ? this.state.length : "none selected"}</Bold>
          <Characteristics onChange={this.onChangeValue}>
            <RadioDiv>
              <div><input type="radio" value="Runs short" name="length" /></div>
              <div>1</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Runs slightly short" name="length" />
              <div>2</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Perfect" name="length" />
              <div>3</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Runs slightly long" name="length" />
              <div>4</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Runs long" name="length" />
              <div>5</div>
            </RadioDiv>
          </Characteristics>

          <Bold> Fit: {this.state.fit ? this.state.fit : "none selected"}</Bold>
          <Characteristics onChange={this.onChangeValue}>
            <RadioDiv>
              <div><input type="radio" value="Runs tight" name="fit" /></div>
              <div>1</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Runs slightly tight" name="fit" />
              <div>2</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Perfect" name="fit" />
              <div>3</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Runs slightly loose" name="fit" />
              <div>4</div>
            </RadioDiv>
            <RadioDiv>
              <input type="radio" value="Runs loose" name="fit" />
              <div>5</div>
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
