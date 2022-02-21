import React from 'react';
import GlobalCSS from '../global.css';
import QABody from './QandA/QABody';
import RelatedItems from './RelatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import Overview from './Overview/Overview';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.ratingsRef = null;
    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo() {
    // window.scrollTo({ top: 0, left: this.ratingsRef.offsetTop, behaviour: 'smooth' });
    this.ratingsRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <GlobalCSS />
        <Overview id={id} scroll={this.scrollTo} />
        <RatingsAndReviews setRef={(el) => (this.ratingsRef = el)} />
        <QABody id={id} />
        <RelatedItems id={id} />
      </div>
    );
  }
}

export default App;
