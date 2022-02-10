import React from 'react';
import QuestionsView from './QuestionsView';
import AnswerQuestion from './AnswerQuestion';
import AskQuestion from './AskQuestion';
import SearchQuestions from './SearchQuestions';

class QABody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <QuestionsView />
        <AskQuestion />
        <SearchQuestions />
        <AnswerQuestion />
      </div>
    );
  }
}

export default QABody;
