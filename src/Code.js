import React, { Component } from 'react';
import lcHOC from 'lc-hoc';
import Highlight from 'react-highlight.js';
import './highlight.css';

class Code extends Component {
  constructor() {
    super();

    this.state = {
      data: 1
    }
  }

  componentDidMount() {
    const _ = this;
    setInterval(() => _.setState({ data: 2 }), 5000);
  }

  render() {
    return (
      <div>
        <h2>Installation and usage</h2>
        <Highlight language={"js"}>
          {`
            // Step 1: Install
            npm install -S lc-hoc;

            // Step 2: Import
            import lcHOC from 'lc-hoc';

            // Step 3: Enhance
            // by decorating
            @lcHOC
            class componentToStudy extends Component { ...

            // or by wrapping
            export default lcHOC(componentToStudy);
          `}
        </Highlight>
      </div>
    )
  }
}

export default lcHOC(Code);
