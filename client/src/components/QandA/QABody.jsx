import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QuestionsView from './QuestionsView';
import SearchQuestions from './SearchQuestions';

const BodyDiv = styled.div`
margin-left: 20%;
margin-right: 20%;
font-style: Stuart, Georgia, serif
display: grid;
grid-template-columns: 25% 25% 25% 25%
grid-template-rows: auto;
grid-template-areas:
  "header header header header"
  "search search search search"
  "main main main main"
  "more more ask ask";
`;

const Title = styled.h1`
  color: #1f513f;
  background-color: #f4f2ed;
  grid-area: header;
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
      url: '/api/product/questions',
      params: {
        product_id: 40345,
      },
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
      </BodyDiv>
    );
  }
}

export default QABody;
