import React from 'react';
import QABody from './QandA/QABody';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>Overview here</div>
        <div>Ratings and Reviews here</div>
        <QABody />
        <div>Related Items Here</div>
      </div>
    );
  }
}

export default App;
