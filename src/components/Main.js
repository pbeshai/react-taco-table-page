import React from 'react';
import Example1 from './Example1';
import './main.scss';
import './taco-table.scss';

// add in performance tooling in dev
if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf');
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <Example1 />
      </div>
    );
  }
}

export default Main;
