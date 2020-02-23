import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from 'pages/Index';
import Explore from 'pages/Explore';
import About from 'pages/About';
import Navbar from 'components/Navbar';
import configureStore from 'state/configure-store';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route path="/" exact component={Index} />
        <Route path="/explore/" component={Explore} />
        <Route path="/about/" component={About} />
      </Router>
    </Provider>
  );
}

export default App;
