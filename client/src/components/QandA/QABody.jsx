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
      search: '',
    };
    this.reRender = this.reRender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/questions',
      params: {
        product_id: id,
      },
    })
      .then((response) => {
        this.setState({
          questions: response.data.results,
        });
      });
  }

  handleSubmit(input) {
    const { search, questions } = this.state;
    const { id } = this.props;
    let searchedQuestions;
    if (input.length < 2 && input.length > 0) {
      return;
    }
    if (input === search) {
      return;
    }
    this.setState({
      search: input,
    });
    if (input.length >= 3) {
      searchedQuestions = questions.filter((question) => {
        return question.question_body.toLowerCase().includes(input);
      });
      // console.log('searched', searchedQuestions);
      this.setState({
        questions: searchedQuestions,
      });
    } else if (input.length === 0) {
      axios({
        method: 'get',
        url: '/api/product/questions',
        params: {
          product_id: id,
        },
      })
        .then((response) => {
          this.setState({
            questions: response.data.results,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  reRender() {
    const { id } = this.props;
    axios({
      method: 'get',
      url: '/api/product/questions',
      params: {
        product_id: id,
      },
    })
      .then((response) => {
        // console.log('questions:', response.data.results);
        this.setState({
          questions: response.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { id } = this.props;
    const { questions } = this.state;
    return (
      <BodyDiv>
        <Title>Questions and Answers</Title>
        <SearchQuestions handleSubmit={this.handleSubmit} questions={questions} product_id={id} />
        <QuestionsView reRender={this.reRender} product_id={id} questions={questions} />
      </BodyDiv>
    );
  }
}

export default QABody;
