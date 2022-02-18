import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
border-radius: 12px;
&: active {
  -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
   -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
        box-shadow: inset 0px 0px 15px #c1c1c1;
};
&: hover {
  cursor: pointer;
}
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
    const { questions, handleSubmit } = this.props;
    const search = input.toLowerCase();
    let searchedQuestions;
    console.log(search);
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
          product_id: 40412,
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
      <form onSubmit={this.handleSubmit}>
        <SearchBar className="search" placeholder="Have a question? Search for answers..." type="text" value={input} onChange={this.handleChange} />
        {/* <SearchButton type="submit" value="Search" /> */}
      </form>
    );
  }
}

export default SearchQuestions;
