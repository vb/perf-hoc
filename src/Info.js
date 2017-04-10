import React, { Component } from 'react';
import lcHOC from './lcHOC';

class Info extends Component {
  render() {
    return (
      <div className="App-intro">
        <h1>lcHOC <span> - Lifecycle HOC</span></h1>
        <p>lcHOC is a HOC (higher order component) that helps you visualize and detect unnecessary rendering and performance issues in React.</p>

        <p>Each time a component update, a green flash wraps the component (much like paint flashing in devtools) and
          rendering information is logged to the console.</p>

        <p>Have an idea on how to improve this component? Please <a href="https://github.com/viktorbergehall/lc-hoc">contribute on Github</a>!</p>
      </div>
    );
  }
}
export default lcHOC(Info);
