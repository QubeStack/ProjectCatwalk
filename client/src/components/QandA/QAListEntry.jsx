import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddAnswer from './AddAnswer';
import AnswerListEntry from './AnswerListEntry';

const QuestionDiv = styled.div`
  color: #1f513f;
  background-color: #f4f2ed;
  padding: 10px;
  grid-area: main;
  display: grid;
  grid-template-columns: 75% 0% 15% 5%;
  grid-template-rows: auto;
  grid-template-areas:
    'header header sidebar sidebar'
    'footer footer footer sidebar';
`;

const Question = styled.div`
  grid-area: header;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 2;
  padding: 10px;
  font-weight: bold;
  overflow-wrap: break-word;
`;

const HelpfulDiv = styled.div`
  grid-area: sidebar;
  grid-row-start: 1;
  grid-column-start: 3;
  grid-column-end: 3;
  justify-self: end;
`;

const YesButton = styled.button`
  color: #1f513f;
  margin-left: 1%;
  margin-right: 1%;
  padding: 0;
  border: none;
  background: none;
  &: hover {
    cursor: pointer;
  }
`;

const AnswerDiv = styled.div`
  grid-area: footer;
  grid-row-start: 7;
  grid-column-start: 1;
  padding: 10px;
  background-color: white;
`;

const MoreAnswersButton = styled.button`
  border-style: solid;
  border-color: #1f513f;
  width: 200px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 3;
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

class QAListEntry extends React.Component {
  constructor(props) {
    super(props);
    const { helpful } = this.props;
    this.state = {
      answers: [],
      disabledQ: false,
      helpful,
      count: 2,
    };
    this.handleHelpfulQ = this.handleHelpfulQ.bind(this);
    this.handleHelpfulA = this.handleHelpfulA.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reRenderView = this.reRenderView.bind(this);
    // this.handleAddAnswer = this.handleAddAnswer.bind(this);
    // this.handleReport = this.handleReport.bind(this);
  }

  componentDidMount() {
    const { question_id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/questions/answers',
      params: {
        product_id: question_id,
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
    const { question_id } = this.props;
    const { disabledQ, helpful } = this.state;
    if (disabledQ) {
      return;
    }
    // make axios req
    axios({
      method: 'put',
      url: '/api/product/questions/helpful',
      params: {
        question_id,
      },
    })
      .then(() => {
        this.setState({
          disabledQ: true,
          helpful: helpful + 1,
        });
      });
  }

  handleHelpfulA(newAnswers) {
    this.setState({
      answers: newAnswers,
    });
  }

  handleClick(e) {
    const { count } = this.state;
    e.preventDefault();
    this.setState({
      count: count + 2,
    });
  }

  reRenderView() {
    const { question_id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/questions/answers',
      params: {
        product_id: question_id,
      },
    })
      .then((response) => {
        this.setState({
          answers: response.data.results,
        });
      });
  }

  // handleReport(e) {
  //   e.preventDefault();
  // }

  render() {
    const { question, question_id, reRender } = this.props;
    const {
      answers, disabled, helpful, count,
    } = this.state;
    if (answers.length === 0) {
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
          <AddAnswer question_id={question_id} />
          <AnswerDiv>
            <strong>A:&#160;</strong>
            No answers yet!
          </AnswerDiv>
        </QuestionDiv>
      );
    }
    if (answers.length > answers.slice(0, count).length) {
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
          <AddAnswer reRender={this.reRenderView} question_id={question_id} />
          <div>
            {answers.slice(0, count).map((answer) => (
              <AnswerListEntry
                key={answer.answer_id}
                answer_id={answer.answer_id}
                answer={answer.body}
                date={answer.date}
                helpful={answer.helpfulness}
                photos={answer.photos}
                username={answer.answerer_name}
                handle={this.handleHelpfulA}
                question_id={question_id}
                reRender={reRender}
              />
            ))}
          </div>
          <MoreAnswersButton onClick={this.handleClick}>Show More Answers</MoreAnswersButton>
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
        <AddAnswer reRender={this.reRenderView} question_id={question_id} />
        <div>
          {answers.slice(0, count).map((answer) => (
            <AnswerListEntry
              key={answer.answer_id}
              answer_id={answer.answer_id}
              answer={answer.body}
              date={answer.date}
              helpful={answer.helpfulness}
              photos={answer.photos}
              username={answer.answerer_name}
            />
          ))}
        </div>
      </QuestionDiv>
    );
  }
}

export default QAListEntry;
