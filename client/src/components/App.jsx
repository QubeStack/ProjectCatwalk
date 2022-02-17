import React from 'react';
import GlobalCSS from '../global.css';
import QABody from './QandA/QABody';
import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <GlobalCSS />
        {/* <Overview />
        <RatingsAndReviews /> */}
        <QABody />
        <RelatedItems />
      </div>
    );
  }
}

export default App;
