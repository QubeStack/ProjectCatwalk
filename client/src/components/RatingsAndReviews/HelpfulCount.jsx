import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
border-style: solid;
border-color: blue;
padding: 1px;
`;

const Inline = styled.div`
display: flex;
align-items: flex-end;
border-style: solid;
border-color: white;
padding: 1px;
`;

const Underline = styled.div`
  margin: 2px;
  text-decoration: underline;
  font-size: 12px;
    &: hover {
      background-color: #1f513f;
      color: white;
      cursor: pointer;
    }
`;

const NormalFont = styled.div`
  font-size: 12px;
  margin: 2px;
`;

class HelpfulCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yes: 0,
      no: 0,
      clicked: false,
    };
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  handleYes() {
    console.log("clicked", this);
    // if (this.state.clicked) {
    //   return;
    // }
    this.setState({ yes: this.state.yes += 1 });
  }

  handleNo() {
    this.setState({ no: this.state.no += 1 });
  }

  render() {
    return (
      <Inline className="helpful">
        <NormalFont>Was this review helpful?  </NormalFont>
        <Underline type="button" onClick={this.handleYes}>{`Yes (${this.state.yes})`}</Underline>
        <Underline type="button" onClick={this.handleNo}>{`  No (${this.state.no})  `}</Underline>
      </Inline>
    );
  }
}

export default HelpfulCount;
