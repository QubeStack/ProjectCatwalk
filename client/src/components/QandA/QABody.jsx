import React from 'react';
import styled from 'styled-components';
import QuestionsView from './QuestionsView';
import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import SearchQuestions from './SearchQuestions';

const BodyDiv = styled.div`

border-color: black;
border-style: solid;
margin-left: 15%;
margin-right: 15%;
`;

const Title = styled.h1`
  color: green;
`;

class QABody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BodyDiv>
        <Title>Questions and Answers</Title>
        <SearchQuestions />
        <QuestionsView />
        <AskQuestion />
      </BodyDiv>
    );
  }
}

export default QABody;
