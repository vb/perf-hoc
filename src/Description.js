import React, { Component } from 'react';
import Info from './Info';
import Code from './Code';

class Intro extends Component {
  render() {
    return (
      <div className="App-container">
        <Info />
        <Code staticData={1}/>
      </div>
    )
  }
}

export default Intro;
