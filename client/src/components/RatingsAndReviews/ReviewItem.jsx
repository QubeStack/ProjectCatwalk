import React from 'react';
import styled from 'styled-components';
import Stars from './ReviewStars';
import HelpfulCount from './HelpfulCount';

const Div = styled.div`
border-style: solid;
border-color: white;
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
`;

const Small = styled.div`
* {
  font-size: 10px;
  color: grey;
}
display: flex;
align-items: flex-end;
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
        <Inline className="reviewItem">
          <Stars rating={this.props.rating} />
          <Bold>{this.props.summary}</Bold>
        </Inline>
        <Small>
          <div>{this.props.username} | </div>
          <div>{this.props.date.slice(0, 10)}</div>
          <Bold>{this.props.recommend ? ' | I recommend this product ✔' : null}</Bold>
        </Small>
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
        <div>{this.props.response ? `Response from Seller: ${this.props.response}` : null}</div>
        <HelpfulCount />
      </>
    );
  }
}

export default ReviewItem;
