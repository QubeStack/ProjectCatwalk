import React from 'react';
import styled from 'styled-components';
import QAListEntry from './QAListEntry';
import AskQuestion from './AskQuestion';

const Container = styled.div`
  display:grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto;
  background-color: #f4f2ed;
`;

const MoreQuestions = styled.button`
  border-style: solid;
  border-color: #1f513f;
  padding: 10px;
  width: 200px;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start:4;
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

const QuestionsDiv1 = styled.div`
  overflow-y: scroll;
  height: 500px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const QuestionsDiv2 = styled.div`
`;

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 4,
    };
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.showLessQuestions = this.showLessQuestions.bind(this);
    this.reRenderView = this.reRenderView.bind(this);
  }

  showMoreQuestions() {
    const { count } = this.state;
    this.setState({
      count: count + 2,
    });
  }

  showLessQuestions() {
    const { count } = this.state;
    this.setState({
      count: count - 2,
    });
  }

  reRenderView() {
    const { reRender } = this.props;
    reRender();
  }

  render() {
    const { count } = this.state;
    const { questions, product_id, product } = this.props;
    let QuestionsDiv;
    if (count >= 4) {
      QuestionsDiv = QuestionsDiv1;
    } else {
      QuestionsDiv = QuestionsDiv2;
    }
    if (questions.length > questions.slice(0, count).length) {
      return (
        <div className="questions">
          <QuestionsDiv>
            {questions.slice(0, count).map((question) => (
              <QAListEntry
                key={question.question_id}
                question_id={question.question_id}
                product_id={product_id}
                question={question.question_body}
                helpful={question.question_helpfulness}
                reRender={this.reRenderView}
                product={product}
              />
            ))}
          </QuestionsDiv>
          <Container>
            <MoreQuestions onClick={this.showMoreQuestions}>
              More Answered Questions
            </MoreQuestions>
            <AskQuestion product={product} reRender={this.reRenderView} product_id={product_id} />
          </Container>
        </div>
      );
    }
    return (
      <div className="questions">
        <QuestionsDiv>
          {questions.slice(0, count).map((question) => (
            <QAListEntry
              key={question.question_id}
              question_id={question.question_id}
              question={question.question_body}
              helpful={question.question_helpfulness}
              product_id={product_id}
              reRender={this.reRenderView}
              product={product}
            />
          ))}
        </QuestionsDiv>
        <Container>
          <AskQuestion product={product} reRender={this.reRenderView} product_id={product_id} />
        </Container>
      </div>
    );
  }
}

export default QuestionsView;
