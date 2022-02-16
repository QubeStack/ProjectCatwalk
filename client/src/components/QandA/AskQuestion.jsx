import React from 'react';
import styled from 'styled-components';

const AskDiv = styled.div`
  grid-row-start: 4;
  grid-column-start: 3;
  grid-column-end: 3;
`;

const AskAQuestion = styled.button`
  border-style: solid;
  border-color: #1f513f;
  padding: 10px;
  width: 200px;
  background-color: white;
  border-radius: 12px;
  &: active {
    -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
     -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
          box-shadow: inset 0px 0px 15px #c1c1c1;
  };
`;

const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 200px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const Content = styled.div`
  background-color: #f4f2ed;
  margin: auto;
  padding: 20px;
  border: 1px solid black;
  width: 80%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 75% 10% 10% 5%;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  grid-row-start: 1;
  grid-column-start: 4;
  justify-self: end;
  font-size: 28px;
  font-weight: bold;
  &: hover {
    cursor: pointer;
    color: black;
  }
`;

const QuestionField = styled.textarea`
  grid-row-start: 1;
  grid-row-end: span 4;
  grid-column-start: 1;
  grid-column-end: span 4;
  height: 200px;
  width: 500px;
`;

const NicknameField = styled.input`
  grid-row-start: 2;
  grid-column-start: 1;
  width: 200px;
`;

const EmailField = styled.input`
  grid-row-start: 3;
  grid-column-start: 1;
  width: 200px;
`;

const ModalSubmit = styled.input`
  grid-row-start: 4;
  grid-column-start: 1;
`;

const NicknameLabel = styled.label`
  grid-row-start: 2;
  grid-column-start: 1;
  border-color: blue;
`;

const EmailLabel = styled.label`
  grid-row-start: 3;
  grid-column-start: 1;
  border-color: blue;
`;

class AskQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      question: '',
      nickname: '',
      email: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({
      showModal: false,
    });
  }

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;

    this.setState({
      [name]: e.target.value,
    });
  }

  handleSubmit(e) {
    const { question, nickname, email } = this.state;
    e.preventDefault();
    console.log(question, nickname, email);
    this.setState({
      showModal: false,
      question: '',
      nickname: '',
      email: '',
    });
  }

  render() {
    const { showModal } = this.state;
    if (showModal) {
      return (
        <AskDiv>
          <AskAQuestion onClick={this.handleClick}>
            Ask a Question
          </AskAQuestion>
          <Modal>
            <Content>
              <CloseButton onClick={this.handleClose}>&times;</CloseButton>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Your Question:*
                  <QuestionField type="text" name="question" placeholder="What is your question?" maxlength="1000" onChange={this.handleChange} />
                </label>
                <NicknameLabel>
                  What is your nickname:*
                  <NicknameField type="text" placeholder="Example: jackson11!" name="nickname" onChange={this.handleChange} />
                  <p>For privacy reasons, do not use your full name or email address.</p>
                </NicknameLabel>
                <EmailLabel>
                  Your Email:*
                  <EmailField type="text" placeholder="Example: jackson@email.com" name="email" onChange={this.handleChange} />
                  <p>For authentication reasons, you will not be emailed.</p>
                </EmailLabel>
                <ModalSubmit type="submit" value="Submit" />
              </form>
            </Content>
          </Modal>
        </AskDiv>
      );
    }
    return (
      <AskDiv>
        <AskAQuestion onClick={this.handleClick}>
          Ask a Question
        </AskAQuestion>
      </AskDiv>
    );
  }
}

export default AskQuestion;
