import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const QuestionDiv = styled.div`
  border-style: solid;
  border-color: red;
  color: #1f513f;
  background-color: #f4f2ed;
  padding: 10px;
`;

const AnswerDiv = styled.div`
  border-style: solid;
  border-color: blue;
  padding: 10px;
`;

class QAListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${this.props.id}/answers`,
      headers: { Authorization: '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' },
    })
      .then((response) => {
        this.setState({
          answers: response.data.results,
        });
      });
  }

  render() {
    return (
      <div>
        <QuestionDiv>
          Question:{this.props.question}
        </QuestionDiv>
        <AnswerDiv>
          Answer:
        </AnswerDiv>
      </div>
    );
  }
}

export default QAListEntry;
