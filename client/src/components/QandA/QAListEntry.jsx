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
    'header header sidebar sidebar'
    'footer footer footer sidebar';
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
  color: #1f513f;
  margin-left: 1%;
  margin-right: 1%;
  padding: 0;
  border: none;
  background: none;
`;
const AnswerYesButton = styled.button`
  color: #1f513f;
  margin-left: 1%;
  margin-right: 1%;
  padding: 0;
  border: none;
  background: none;
  font-size: 10px;
`;

const AnswerInfo = styled.div`
  font-size: 10px;
  padding-top: 10px;
`;

const months = ['0', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class QAListEntry extends React.Component {
  constructor(props) {
    super(props);
    const { helpful } = this.props;
    this.state = {
      answers: [],
      disabledQ: false,
      disabledA: false,
      helpful,
    };
    this.handleHelpfulQ = this.handleHelpfulQ.bind(this);
    this.handleHelpfulA = this.handleHelpfulA.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleReport = this.handleReport.bind(this);
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

  handleHelpfulQ(e) {
    e.preventDefault();
    const { id } = this.props;
    const { disabledQ, helpful } = this.state;
    if (disabledQ) {
      return;
    }
    // make axios req
    axios({
      method: 'put',
      url: '/api/product/questions/helpful',
      params: {
        question_id: id,
      },
    })
      .then(() => {
        this.setState({
          disabledQ: true,
          helpful: helpful + 1,
        });
      });
  }

  handleHelpfulA(e) {
    e.preventDefault();
    const { id } = this.props;
    const { disabledA, answers } = this.state;
    if (disabledA) {
      return;
    }
    axios({
      method: 'put',
      url: '/api/product/questions/answers/helpful',
      params: {
        answer_id: answers[0].answer_id,
      },
    })
      .then(() => {
        this.setState({
          disabledA: true,
        });
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
      });
  }

  handleReport(e) {
    e.preventDefault();
  }

  handleAddAnswer(e) {
    e.preventDefault();
    console.log('clicked add answer');
  }

  render() {
    const { question } = this.props;
    const { answers, disabled, helpful } = this.state;
    let answer;
    let user;
    let date;
    let monthStr;
    let helpfulScore;
    if (answers[0] === undefined) {
      answer = '';
      user = '';
      date = '';
    } else {
      answer = answers[0].body;
      user = answers[0].answerer_name;
      monthStr = Number(answers[0].date.substring(6, 7));
      date = `${months[monthStr]} ${answers[0].date.substring(8, 10)},${answers[0].date.substring(0, 4)}`;
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
            <YesButton disabled={disabled} onClick={this.handleHelpfulQ}>
              <u>Yes</u>
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
    if (user === 'Seller') {
      return (
        <QuestionDiv>
          <Question>
            Q:&#160;
            {question}
          </Question>
          <HelpfulDiv>
            Helpful?
            <YesButton onClick={this.handleHelpfulQ}>
              <u>Yes</u>
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
              <strong>{user}</strong>
            &#160;on:&#160;
              {date}
              &#160;&#160;&#160;&#160;
              Helpful?
              <AnswerYesButton onClick={this.handleHelpfulA}>
                <u>Yes</u>
                &#40;
                {helpfulScore}
                &#41;
              </AnswerYesButton>
            </AnswerInfo>
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
          <YesButton onClick={this.handleHelpfulQ}>
            <u>Yes</u>
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
            Helpful?
            <AnswerYesButton onClick={this.handleHelpfulA}>
              <u>Yes</u>
              &#40;
              {helpfulScore}
              &#41;
            </AnswerYesButton>
          </AnswerInfo>
        </AnswerDiv>
      </QuestionDiv>
    );
  }
}

export default QAListEntry;
