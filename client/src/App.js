import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css';
import { Scroll } from './components/scroll';
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes();
  return (
    <Router>
      <Scroll />
      <div className="wr">{routes}</div>
    </Router>
  );
}

export default App;
