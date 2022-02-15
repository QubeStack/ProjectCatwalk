import React from 'react';
import styled from 'styled-components';
import Stars from './ReviewStars';
import HelpfulCount from './HelpfulCount';

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

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Div>{this.props.summary}</Div>
        <Inline>
          <Stars />
          <Div>{this.props.username}</Div>
          <Div>{this.props.date}</Div>
        </Inline>
        <Div>{this.props.body}</Div>
        <button type="button">Show More</button>
        <Inline>
          <img src="http://placecorgi.com/60/60" />
          <img src="http://placecorgi.com/60/60" />
          <img src="http://placecorgi.com/60/60" />
          <img src="http://placecorgi.com/60/60" />
          <img src="http://placecorgi.com/60/60" />
        </Inline>
        <Div>{this.props.recommend ? "I recommend this product ✔" : null}</Div>
        <Div>{this.props.response ? `Response from Seller: ${this.props.response}` : null}</Div>
        <HelpfulCount />
      </>
    );
  }
}

export default ReviewItem;
