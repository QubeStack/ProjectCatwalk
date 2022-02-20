import React from 'react';
import styled from 'styled-components';
import Stars from './ReviewStars';
import HelpfulCount from './HelpfulCount';

const Div = styled.div`
border-style: solid;
border-color: white;
padding: 1px;
`;

const Bold = styled.div`
font-weight: bold;
`;

const Underline = styled.div`
  text-decoration: underline;
  color: grey;
  font-size: 12px;
`;

const Inline = styled.div`
display: flex;
align-items: center;
border-style: solid;
border-color: black;
border-width: 0px;
`;

const Small = styled.div`
* {
  font-size: 10px;
  color: grey;
}
display: flex;
border-style: solid;
border-color: white;
padding: 1px;
`;

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreIsClicked: false,
    };
  }

  render() {
    return (
      <>
        <Inline>
          <Stars rating={this.props.rating} />
          <Bold>{this.props.summary}</Bold>
        </Inline>
        <Div>
          {this.props.body.length > 250
            ? (
              <div>
                {this.state.showMoreIsClicked ? this.props.body : this.props.body.slice(0, 250)}
                <Underline type="button" onClick={() => this.setState({ showMoreIsClicked: !this.state.showMoreIsClicked })}>
                  {this.state.showMoreIsClicked ? 'Show Less' : 'Show More'}
                </Underline>
              </div>
            )
            : this.props.body}
        </Div>
        <Inline>
          {this.props.photos.map((photo) => (
            <img src={photo.url} width={60} height={60} />
          ))}
        </Inline>
        <Small>
          <Div>{this.props.username} | </Div>
          <Div>{this.props.date.slice(0, 10)}</Div>
          <Bold>{this.props.recommend ? ' | I recommend this product ✔' : null}</Bold>
        </Small>
        <Div>{this.props.response ? `Response from Seller: ${this.props.response}` : null}</Div>
        <HelpfulCount />
      </>
    );
  }
}

export default ReviewItem;
