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
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${this.props.id}/answers`,
      headers: { Authorization: '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' },
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
    // console.log(this.props.id, this.state.answers);
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
          Answer:
        </AnswerDiv>
      </QuestionDiv>
    );
  }
}

export default QAListEntry;
