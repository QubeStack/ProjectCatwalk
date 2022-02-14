import React from 'react';
import styled from 'styled-components';
import QAListEntry from './QAListEntry';

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
  grid-row-start:4;
  background-color: white;
`;

const AskAQuestion = styled.button`
  border-style: solid;
  border-color: #1f513f;
  padding: 10px;
  width: 200px;
  grid-row-start: 4;
  grid-column-start: 3;
  background-color: white;
`;

class QuestionsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 2,
    };
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
  }

  showMoreQuestions() {
    const { count } = this.state;
    this.setState({
      count: count + 2,
    });
  }

  render() {
    const { count } = this.state;
    const { questions } = this.props;

    if (questions.length > questions.slice(0, count).length) {
      return (
        <div>
          <div>
            {questions.slice(0, count).map((question) => (
              <QAListEntry
                key={question.question_id}
                id={question.question_id}
                question={question.question_body}
                helpful={question.question_helpfulness}
              />
            ))}
          </div>
          <Container>
            <MoreQuestions onClick={this.showMoreQuestions}>
              More Answered Questions
            </MoreQuestions>
            <AskAQuestion>
              Ask a Question
            </AskAQuestion>
          </Container>
        </div>
      );
    }
    return (
      <div>
        <div>
          {questions.slice(0, count).map((question) => (
            <QAListEntry
              key={question.question_id}
              id={question.question_id}
              question={question.question_body}
              helpful={question.question_helpfulness}
            />
          ))}
        </div>
        <Container>
          <AskAQuestion>
            Ask a Question
          </AskAQuestion>
        </Container>
      </div>
    );
  }
}

export default QuestionsView;
