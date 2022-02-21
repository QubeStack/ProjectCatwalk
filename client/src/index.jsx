import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import App from './components/App';

function DisplayApp() {
  const { id } = useParams();
  return <App id={id} />;
}

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/products/:id" element={<DisplayApp />} />
    </Routes>
  </Router>,
  document.getElementById('app'),
);
