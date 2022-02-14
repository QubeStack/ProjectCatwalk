import React from 'react';
import styled from 'styled-components';

const AskAQuestion = styled.button`
  border-style: solid;
  border-color: green;
  padding: 10px;
  width: 200px;
  display: inline-block;
`;

const AskQuestion = (props) => (
  <AskAQuestion>AskQuestion</AskAQuestion>
);

export default AskQuestion;
