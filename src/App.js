import React, { Component } from 'react';

import Header from './Header';
import Description from './Description';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { data: '' }
  }

  render() {
    return (
      <div className="App">
        <Header />

        <button onClick={() => this.setState({ data: new Date()})}>Update state</button>

        <Description data={this.state.data} />
      </div>
    );
  }
}

export default App;
