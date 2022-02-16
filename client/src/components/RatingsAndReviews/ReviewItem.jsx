import React from 'react';
import styled from 'styled-components';
import Stars from './ReviewStars';
import HelpfulCount from './HelpfulCount';

const Div = styled.div`
border-style: solid;
border-color: white;
padding: 1px;
`;

const Inline = styled.div`
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
        <Div>{this.props.summary}</Div>
        <Inline>
          <Stars />
          <Div>{this.props.username}</Div>
          <Div>{this.props.date}</Div>
        </Inline>
        <Div>
          {this.props.body.length > 250
            ? (
              <>
                <div>
                  {this.state.showMoreIsClicked ? this.props.body : this.props.body.slice(0, 250)}
                </div>
                <button type="button" onClick={() => this.setState({ showMoreIsClicked: !this.state.showMoreIsClicked })}>
                  {this.state.showMoreIsClicked ? 'Show Less' : 'Show More'}
                </button>
              </>
            )
            : this.props.body}
        </Div>
        <Inline>
          {this.props.photos.map((photo) => (
            <img src={photo.url} width={60} height={60} />
          ))}
        </Inline>
        <Div>{this.props.recommend ? 'I recommend this product ✔' : null}</Div>
        <Div>{this.props.response ? `Response from Seller: ${this.props.response}` : null}</Div>
        <HelpfulCount />
      </>
    );
  }
}

export default ReviewItem;
