import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
  width: 80%;
  height: 50px;
  margin-bottom: 10px;
`;

const SearchButton = styled.input`
border-style: solid;
border-color: #1f513f;
padding: 10px;
width: auto;
background-color: white;
margin-left: 1%;
`;

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value,
    });
  }

  handleSearch(e) {
    const { input } = this.state;
    e.preventDefault();
    console.log(input);
    this.setState({
      input: '',
    });
  }

  render() {
    const { input } = this.state;
    return (
      <form onSubmit={this.handleSearch}>
        <SearchBar placeholder="Have a question? Ask it here!" type="text" value={input} onChange={this.handleChange} />
        <SearchButton type="submit" value="Search" />
      </form>
    );
  }
}

export default SearchQuestions;
