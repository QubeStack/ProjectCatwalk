import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  &: hover {
    cursor: pointer;
  }
`;

const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 3;
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
  border: 1px solid black;
  width: 80%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 5% 70% 10% 10% 5%;
`;

const ModalHeader = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  background-color: black;
  color: white;
  align-self: start;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  grid-row-start: 1;
  grid-column-start: 4;
  justify-self: end;
  padding-right: 10px;
  font-size: 28px;
  font-weight: bold;
  &: hover {
    cursor: pointer;
    color: black;
  }
`;

const QuestionField = styled.textarea`
  grid-row-start: 2;
  grid-row-end: span 4;
  grid-column-start: 1;
  grid-column-end: span 4;
  height: 200px;
  width: 500px;
  margin-left: 10px;
`;

const QuestionLabel = styled.label`
  grid-row-start: 1;
  padding-left: 10px;
`;

const NicknameField = styled.input`
  grid-row-start: 3;
  grid-column-start: 1;
  width: 200px;
  margin-left: 10px;
`;

const NicknameLabel = styled.label`
  grid-row-start: 3;
  grid-column-start: 1;
  padding-left: 10px;
`;

const EmailField = styled.input`
  grid-row-start: 4;
  grid-column-start: 1;
  width: 200px;
  margin-left: 10px;
`;

const EmailLabel = styled.label`
  grid-row-start: 4;
  grid-column-start: 1;
  padding-left: 10px;
`;

const ModalSubmit = styled.input`
  grid-row-start: 5;
  grid-column-start: 1;
  margin-left: 10px;
  &: hover {
    cursor: pointer;
  }
`;

const ModalForm = styled.form`
  grid-row-start:2;
`;

const FormText = styled.p`
  padding-left: 10px;
`;

class AskQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      question: '',
      nickname: '',
      email: '',
      product_id: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { product_id } = this.props;
    this.setState({
      product_id,
    });
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
    const {
      question, nickname, email, product_id,
    } = this.state;
    const { reRender } = this.props;
    e.preventDefault();
    const newproduct_id = Number(product_id);
    axios({
      method: 'post',
      url: '/api/product/questions',
      data:
       {
         body: question,
         name: nickname,
         email,
         product_id: newproduct_id,
       },
    })
      .then(() => {
        reRender();
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      showModal: false,
      question: '',
      nickname: '',
      email: '',
    });
  }

  render() {
    const {
      showModal, question, nickname, email, product_id,
    } = this.state;
    if (showModal) {
      return (
        <AskDiv>
          <AskAQuestion className="ask" onClick={this.handleClick}>
            Ask a Question
          </AskAQuestion>
          <Modal className="modal">
            <Content>
              <ModalHeader>
                Ask Your Question - About the Product ID&nbsp;
                {product_id}
              </ModalHeader>
              <CloseButton onClick={this.handleClose}>&times;</CloseButton>
              <ModalForm onSubmit={this.handleSubmit}>
                <QuestionLabel>
                  Your Question*:
                  <QuestionField type="text" value={question} name="question" placeholder="What is your question?" maxlength="1000" onChange={this.handleChange} />
                </QuestionLabel>
                <NicknameLabel>
                  What is your nickname*:
                  <NicknameField type="text" value={nickname} placeholder="Example: jackson11!" name="nickname" onChange={this.handleChange} />
                  <FormText>
                    For privacy reasons, do not use your full name or email address.
                  </FormText>
                </NicknameLabel>
                <EmailLabel>
                  Your Email*:
                  <EmailField type="text" value={email} placeholder="Example: jackson@email.com" name="email" onChange={this.handleChange} />
                  <FormText>For authentication reasons, you will not be emailed.</FormText>
                </EmailLabel>
                <ModalSubmit type="submit" value="Submit" />
              </ModalForm>
            </Content>
          </Modal>
        </AskDiv>
      );
    }
    return (
      <AskDiv>
        <AskAQuestion className="ask" onClick={this.handleClick}>
          Ask a Question
        </AskAQuestion>
      </AskDiv>
    );
  }
}

export default AskQuestion;
