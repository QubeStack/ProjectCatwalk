import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QuestionsView from './QuestionsView';
import AskQuestion from './AskQuestion';
import SearchQuestions from './SearchQuestions';

const BodyDiv = styled.div`

border-color: black;
border-style: solid;
margin-left: 20%;
margin-right: 20%;
font-style: Stuart, Georgia, serif
`;

const Title = styled.h1`
  color: #1f513f;
  background-color: #f4f2ed;
`;

class QABody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=40345',
      headers: { Authorization: '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' },
    })
      .then((response) => {
        this.setState({
          questions: response.data.results,
        });
      });
  }

  render() {
    const { questions } = this.state;
    return (
      <BodyDiv>
        <Title>Questions and Answers</Title>
        <SearchQuestions />
        <QuestionsView questions={questions} />
        <AskQuestion />
      </BodyDiv>
    );
  }
}

export default QABody;
