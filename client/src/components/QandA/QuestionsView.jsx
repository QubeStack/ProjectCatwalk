import React from 'react';
import styled from 'styled-components';
import QAListEntry from './QAListEntry';

const MoreQuestions = styled.div`
  border-style: solid;
  border-color: green;
  padding: 10px;
  width: 200px;
`;
function QuestionsView(props) {
  const { questions } = props;

  return (
    <div>
      <div>
        {questions.map((question) =>
          <QAListEntry key={question.question_id} id={question.question_id} question={question.question_body}/>)}
      </div>
      <MoreQuestions>
        More Answered Questions
      </MoreQuestions>
    </div>
  );
}

export default QuestionsView;
