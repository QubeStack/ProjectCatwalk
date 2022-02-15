import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const QuestionDiv = styled.div`
  color: #1f513f;
  background-color: #f4f2ed;
  padding: 10px;
  grid-area: main;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto;
  grid-template-areas:
    "header header sidebar sidebar"
    "footer footer footer sidebar";
`;

const Question = styled.div`
  grid-area: header;
  grid-column-start: 1;
  grid-row-start: 1;
  padding: 10px;
  font-weight: bold;
`;

const HelpfulDiv = styled.div`
  grid-area: sidebar;
  grid-row-start: 1;
  grid-column-start: 3;
  grid-column-end: 3;
  justify-self: end;
`;

const AddAnswer = styled.button`
  grid-row-start: 1;
  grid-column-start: 4;
  justify-self: end;
  text-decoration: underline;
  color: #1f513f;
  margin-left: 1%;
  margin-right: 1%;
  padding: 0;
  border: none;
  background: none;
`;

const AnswerDiv = styled.div`
  grid-area: footer;
  grid-row-start: 7;
  grid-column-start: 1;
  padding: 10px;
  background-color: white;
`;

const YesButton = styled.button`
  text-decoration: underline;
  color: #1f513f;
  margin-left: 1%;
  margin-right: 1%;
  padding: 0;
  border: none;
  background: none;
`;

const AnswerInfo = styled.div`
  font-size: 10px;
  padding-top: 10px;
`;

class QAListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
    };
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/questions/answers',
      params: {
        product_id: id,
      },
    })
      .then((response) => {
        this.setState({
          answers: response.data.results,
        });
      });
  }

  handleHelpful(e) {
    e.preventDefault();
    console.log('clicked yes');
  }

  handleAddAnswer(e) {
    e.preventDefault();
    console.log('clicked add answer');
  }

  render() {
    const { question, helpful } = this.props;
    const { answers } = this.state;
    let answer;
    let user;
    let date;
    let helpfulScore;
    if (answers[0] === undefined) {
      answer = '';
      user = '';
      date = '';
      helpfulScore = '';
    } else {
      answer = answers[0].body;
      user = answers[0].answerer_name;
      date = `${answers[0].date.substring(6, 10)}-${answers[0].date.substring(0, 4)}`;
      helpfulScore = answers[0].helpfulness;
    }

    if (answer === '') {
      return (
        <QuestionDiv>
          <Question>
            Q:&#160;
            {question}
          </Question>
          <HelpfulDiv>
            Helpful?
            <YesButton onClick={this.handleHelpful}>
              Yes
              &#40;
              {helpful}
              &#41;
            </YesButton>
          </HelpfulDiv>
          <AddAnswer onClick={this.handleAddAnswer}>
            Add Answer!
          </AddAnswer>
          <AnswerDiv>
            <strong>A:&#160;</strong>
            No answers yet!
          </AnswerDiv>
        </QuestionDiv>
      );
    }
    return (
      <QuestionDiv>
        <Question>
          Q:&#160;
          {question}
        </Question>
        <HelpfulDiv>
          Helpful?
          <YesButton onClick={this.handleHelpful}>
            Yes
            &#40;
            {helpful}
            &#41;
          </YesButton>
        </HelpfulDiv>
        <AddAnswer onClick={this.handleAddAnswer}>
          Add Answer!
        </AddAnswer>
        <AnswerDiv>
          <strong>A:&#160;</strong>
          {answer}
          <AnswerInfo>
            by:&#160;
            {user}
          &#160;on:&#160;
            {date}
          </AnswerInfo>
        </AnswerDiv>
      </QuestionDiv>
    );
  }
}

export default QAListEntry;
