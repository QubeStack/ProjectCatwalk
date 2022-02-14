import React from 'react';
import styled from 'styled-components';
import QAListEntry from './QAListEntry';

const MoreQuestions = styled.button`
  border-style: solid;
  border-color: green;
  padding: 10px;
  width: 200px;
  grid-column-start: 1;
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
    return (
      <div>
        <div>
          {questions.slice(0, count).map((question) => (
            <QAListEntry
              key={question.question_id}
              id={question.question_id}
              question={question.question_body}
            />
          ))}
        </div>
        <MoreQuestions onClick={this.showMoreQuestions}>
          More Answered Questions
        </MoreQuestions>
      </div>
    );
  }
}

export default QuestionsView;
