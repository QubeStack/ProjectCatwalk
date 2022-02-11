import React from 'react';
import GlobalCSS from '../global.css';
import QABody from './QandA/QABody';
import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';

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
        <Overview />
        <div>Ratings and Reviews here</div>
        <QABody />
        <RelatedItems />
      </div>
    );
  }
}

export default App;
