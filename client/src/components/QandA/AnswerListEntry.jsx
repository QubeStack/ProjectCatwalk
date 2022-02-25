import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AnswerDiv = styled.div`
  grid-area: footer;
  grid-row-start: 7;
  grid-column-start: 1;
  padding: 10px;
  background-color: white;
`;

const AnswerYesButton = styled.button`
  color: #1f513f;
  margin-left: 1%;
  margin-right: 1%;
  padding: 0;
  border: none;
  background: none;
  font-size: 10px;
  &: hover {
    cursor: pointer;
  }
`;

const ReportButton = styled.button`
  grid-row-start: 1;
  grid-column-start: 3;
  grid-column-end: 3;
  justify-self: center;
  color: #1f513f;
  font-size: 10px;
  border: none;
  background: none;
  &: hover {
    cursor: pointer;
  }
`;

const AnswerInfo = styled.div`
  font-size: 10px;
  padding-top: 10px;
  grid-column-start: 1;
`;

const AnswerImage = styled.img`
  &: hover {
    cursor: pointer;
  }
`;
const months = ['0', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class AnswerListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledA: false,
      reported: false,
    };

    this.handleHelpfulA = this.handleHelpfulA.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleHelpfulA(e) {
    e.preventDefault();
    const { answer_id, handle, question_id } = this.props;
    const { disabledA } = this.state;
    if (disabledA) {
      return;
    }
    axios({
      method: 'put',
      url: '/api/product/questions/answers/helpful',
      params: {
        answer_id,
      },
    })
      .then(() => {
        this.setState({
          disabledA: true,
        });
        axios({
          method: 'get',
          url: '/api/product/questions/answers',
          params: {
            question_id,
          },
        })
          .then((response) => {
            handle(response.data.results);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleReport(e) {
    const { reported } = this.state;
    const { answer_id } = this.props;
    e.preventDefault();
    if (reported) {
      return;
    }
    axios({
      method: 'put',
      url: '/api/product/questions/answers/report',
      params: {
        answer_id,
      },
    })
      .then(() => {
        this.setState({
          reported: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      username, answer, date, helpful, photos,
    } = this.props;
    const { reported } = this.state;
    let reportText = 'Report';
    let photoURL;
    if (reported) {
      reportText = 'Reported';
    }
    const monthStr = Number(date.substring(5, 7));
    const newDate = `${months[monthStr]} ${date.substring(8, 10)},${date.substring(0, 4)}`;
    if (photos.length === 0) {
      photoURL = null;
    } else {
      photoURL = photos[0].url;
    }
    if (photoURL === null) {
      if (username === 'Seller') {
        return (
          <AnswerDiv className="answer">
            <strong>A:&nbsp;</strong>
            {answer}
            <AnswerInfo>
              by:&nbsp;&nbsp;
              <strong>{username}</strong>
              &nbsp;&nbsp;on:&nbsp;&nbsp;
              {newDate}
              &nbsp;&nbsp;Helpful?
              <AnswerYesButton className="yesbutton" onClick={this.handleHelpfulA}>
                <u>Yes</u>
                &#40;
                {helpful}
                &#41;
              </AnswerYesButton>
              <ReportButton onClick={this.handleReport}><u>{reportText}</u></ReportButton>
            </AnswerInfo>
          </AnswerDiv>
        );
      }
      return (
        <AnswerDiv className="answer">
          <strong>A:&nbsp;</strong>
          {answer}
          <AnswerInfo>
            by:&nbsp;&nbsp;
            {username}
            &nbsp;&nbsp;on:&nbsp;&nbsp;
            {newDate}
            &nbsp;&nbsp;Helpful?
            <AnswerYesButton className="yesbutton" onClick={this.handleHelpfulA}>
              <u>Yes</u>
              &#40;
              {helpful}
              &#41;
            </AnswerYesButton>
            <ReportButton onClick={this.handleReport}><u>{reportText}</u></ReportButton>
          </AnswerInfo>
        </AnswerDiv>
      );
    }
    if (username === 'Seller') {
      return (
        <AnswerDiv className="answer">
          <strong>A:&nbsp;</strong>
          {answer}
          <AnswerInfo>
            by:&nbsp;&nbsp;
            <strong>{username}</strong>
            &nbsp;&nbsp;on:&nbsp;&nbsp;
            {newDate}
            &nbsp;&nbsp;Helpful?
            <AnswerYesButton className="yesbutton" onClick={this.handleHelpfulA}>
              <u>Yes</u>
              &#40;
              {helpful}
              &#41;
            </AnswerYesButton>
            <ReportButton onClick={this.handleReport}><u>{reportText}</u></ReportButton>
          </AnswerInfo>
          <div>
            <AnswerImage src={photoURL} alt="" width={60} height={60} />
          </div>
        </AnswerDiv>
      );
    }
    return (
      <AnswerDiv className="answer">
        <strong>A:&nbsp;</strong>
        {answer}
        <AnswerInfo>
          by:&nbsp;&nbsp;
          {username}
          &nbsp;&nbsp;on:&nbsp;&nbsp;
          {newDate}
          &nbsp;&nbsp;Helpful?
          <AnswerYesButton className="yesbutton" onClick={this.handleHelpfulA}>
            <u>Yes</u>
            &#40;
            {helpful}
            &#41;
          </AnswerYesButton>
          <ReportButton onClick={this.handleReport}><u>{reportText}</u></ReportButton>
        </AnswerInfo>
        <div>
          <AnswerImage src={photoURL} alt="" width={60} height={60} />
        </div>
      </AnswerDiv>
    );
  }
}

export default AnswerListEntry;
