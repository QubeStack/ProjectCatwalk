import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddAnswer from './AddAnswer';
import AnswerListEntry from './AnswerListEntry';

const QuestionDiv = styled.div`
  font-family: verdana;
  color: #1f513f;
  background-color: #f4f2ed;
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
  grid-column-start: 2;
  grid-column-end: 2;
  justify-self: end;
`;

const ReportButton = styled.button`
  font-family: verdana;
  grid-row-start: 1;
  grid-column-start: 3;
  grid-column-end: 3;
  justify-self: center;
  color: #1f513f;
  border: none;
  background: none;
  &: hover {
    cursor: pointer;
  }
`;

const YesButton = styled.button`
  font-family: verdana;
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

const NoAnswerDiv = styled.div`
  background-color: white;
  grid-area: footer;
  grid-row-start: 7;
  grid-column-start: 1;
  width: 110%
  padding:10px;
`;

const AnswerDivNoScroll = styled.div`
  grid-area: footer;
  grid-row-start: 7;
  grid-column-start: 1;
  width: 110%
`;

const AnswerDivScroll = styled.div`
  grid-area: footer;
  grid-row-start: 7;
  grid-column-start: 1;
  overflow-y: scroll;
  height: 200px;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 110%
`;

const MoreAnswersButton = styled.button`
  font-family: verdana;
  border-style: solid;
  border-color: #1f513f;
  width: 200px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 3;
  background-color: white;
  border-radius: 12px;
  &: hover {
    background-color: #1f513f;
    cursor: pointer;
    border-color: #f4f2ed;
    color: #f4f2ed;
  };
  &: active {
    background-color: white;
    color: black;
    border-color: #1f513f;
    -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
     -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
          box-shadow: inset 0px 0px 15px #c1c1c1;
  };

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
      reported: false,
    };
    this.handleHelpfulQ = this.handleHelpfulQ.bind(this);
    this.handleHelpfulA = this.handleHelpfulA.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reRenderView = this.reRenderView.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.findSeller = this.findSeller.bind(this);
  }

  componentDidMount() {
    const { question_id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/questions/answers',
      params: {
        question_id,
      },
    })
      .then((response) => {
        this.setState({
          answers: response.data.results,
        });
      })
      .catch((error) => {
        // console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
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

  handleReport(e) {
    const { reported } = this.state;
    const { question_id } = this.props;
    e.preventDefault();
    if (reported) {
      return;
    }
    axios({
      method: 'put',
      url: '/api/product/questions/report',
      params: {
        question_id,
      },
    })
      .then(() => {
        this.setState({
          reported: true,
        });
      })
      .then(() => {
        this.reRenderView();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reRenderView() {
    const { question_id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/questions/answers',
      params: {
        question_id,
      },
    })
      .then((response) => {
        this.setState({
          answers: response.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  findSeller(a, b) {
    if (a.answerer_name === 'Seller' && b.answerer_name !== 'Seller') {
      return -1;
    }
    if (a.answerer_name !== 'Seller' && b.answerer_name === 'Seller') {
      return 1;
    }
    return 0;
  }

  render() {
    let AnswersDiv;
    const {
      question, question_id, reRender, product_id, product,
    } = this.props;
    const {
      answers, disabled, helpful, count, reported,
    } = this.state;
    answers.sort(this.findSeller);
    let reportText = 'Report';
    if (reported) {
      reportText = 'Reported';
    }
    if (count >= 4) {
      AnswersDiv = AnswerDivScroll;
    } else {
      AnswersDiv = AnswerDivNoScroll;
    }
    if (answers.length === 0) {
      return (
        <QuestionDiv>
          <Question>
            Q:&#160;
            {question}
          </Question>
          <HelpfulDiv className="helpful">
            Helpful?
            <YesButton className="yes" disabled={disabled} onClick={this.handleHelpfulQ}>
              <u>Yes</u>
              &#40;
              {helpful}
              &#41;
            </YesButton>
          </HelpfulDiv>
          <ReportButton className="report" onClick={this.handleReport}><u>{reportText}</u></ReportButton>
          <AddAnswer product={product} question={question} reRender={this.reRenderView} product_id={product_id} question_id={question_id} />
          <NoAnswerDiv>
            <strong>&nbsp;&nbsp;A:&#160;</strong>
            No answers yet!
          </NoAnswerDiv>
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
          <HelpfulDiv className="helpful">
            Helpful?
            <YesButton className="yes" onClick={this.handleHelpfulQ}>
              <u>Yes</u>
              &#40;
              {helpful}
              &#41;
            </YesButton>
          </HelpfulDiv>
          <ReportButton className="report" onClick={this.handleReport}><u>{reportText}</u></ReportButton>
          <AddAnswer product={product} product_id={product_id} question={question} reRender={this.reRenderView} question_id={question_id} />
          <AnswersDiv>
            {answers.slice(0, count).map((answer) => (
              <AnswerListEntry
                key={answer.answer_id}
                answer_id={answer.answer_id}
                answer={answer.body}
                date={answer.date}
                helpful={answer.helpfulness}
                photos={answer.photos}
                username={answer.answerer_name}
                wholeAnswer={answer}
                question_id={question_id}
                handle={this.handleHelpfulA}
                reRender={reRender}
              />
            ))}
            <MoreAnswersButton onClick={this.handleClick}>Show More Answers</MoreAnswersButton>
          </AnswersDiv>
        </QuestionDiv>

      );
    }
    return (
      <QuestionDiv>
        <Question>
          Q:&#160;
          {question}
        </Question>
        <HelpfulDiv className="helpful">
          Helpful?
          <YesButton className="yes" onClick={this.handleHelpfulQ}>
            <u>Yes</u>
            &#40;
            {helpful}
            &#41;
          </YesButton>
        </HelpfulDiv>
        <ReportButton className="report" onClick={this.handleReport}><u>{reportText}</u></ReportButton>
        <AddAnswer
          product={product}
          product_id={product_id}
          question={question}
          reRender={this.reRenderView}
          question_id={question_id}
        />
        <AnswersDiv>
          {answers.slice(0, count).map((answer) => (
            <AnswerListEntry
              key={answer.answer_id}
              answer_id={answer.answer_id}
              answer={answer.body}
              date={answer.date}
              helpful={answer.helpfulness}
              photos={answer.photos}
              username={answer.answerer_name}
              question_id={question_id}
              handle={this.handleHelpfulA}
              reRender={reRender}
            />
          ))}
        </AnswersDiv>
      </QuestionDiv>
    );
  }
}

export default QAListEntry;
