import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
`;

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    const { handleSubmit } = this.props;
    const { input } = this.state;
    const newInput = input.toLowerCase();
    handleSubmit(newInput);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value,
    });
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
