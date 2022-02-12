import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
  width: 90%;
  height: 50px;
  margin-bottom: 10px;
`;

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };
  }

  render() {
    return (
      <form>
        <SearchBar placeholder="Have a question? Ask it here!" type="text" value={this.state.input}/>
        <input type="submit" value="ask" />
      </form>
    );
  }
}

export default SearchQuestions;
