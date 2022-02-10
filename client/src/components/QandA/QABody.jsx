import React from 'react';
import QuestionsView from './QuestionsView.jsx';
import AnswerQuestion from './AnswerQuestion.jsx';
import AskQuestion from './AskQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';

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
