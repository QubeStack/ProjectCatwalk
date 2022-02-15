import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
border-style: solid;
border-color: blue;
padding: 3px;
`;

const Inline = styled.div`
display: flex;
border-style: solid;
border-color: blue;
padding: 3px;
`;

class HelpfulCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yes: 0,
      no: 0,
    };
    this.handleYes = this.handleYes.bind(this);
  }

  handleYes() {
    console.log("clicked", this);
    this.state.yes++;
  }

  render() {
    return (
      <Inline>
        <div>Was this review helpful?</div>
        <button type="button" onClick={this.handleYes}>{`Yes (${this.state.yes})`}</button>
        <button type="button">{`No (${this.state.no})`}</button>
      </Inline>
    );
  }
}

export default HelpfulCount;
