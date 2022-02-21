import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchBar = styled.input`
  width: 80%;
  height: 50px;
  margin-bottom: 10px;
`;

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value,
    });
    this.handleSearch();
  }

  handleSearch() {
    const { input } = this.state;
    const { questions, handleSubmit, product_id } = this.props;
    const search = input.toLowerCase();
    let searchedQuestions;
    console.log('search', input);
    if (search.length >= 2) {
      searchedQuestions = questions.filter((question) => {
        return question.question_body.toLowerCase().includes(search);
        });
      handleSubmit(searchedQuestions);
    } else {
      axios({
        method: 'get',
        url: '/api/product/questions',
        params: {
          product_id,
        },
      })
        .then((response) => {
          handleSubmit(response.data.results);
        });
    }
  }

  render() {
    const { input } = this.state;
    return (
      <form>
        <SearchBar className="search" placeholder="Have a question? Search for answers..." type="text" value={input} onChange={this.handleChange} />
      </form>
    );
  }
}

export default SearchQuestions;
