import React from 'react';
import './lcHOC.css';

const getName = (W) => {
  return W.displayName ||
         W.name ||
         'Component'
}
const CLASSNAME = 'lc-hoc',
      CLASSNAME_UPDATE = 'lc-hoc--update'

const lcHOC = (W) => {
  return class lcHOC extends W {
    constructor() {
      super();
      this.name = getName(W);
      this.oldProps = {};
    }

    toggleClass() {
      this.lchoc.classList.remove(CLASSNAME_UPDATE);
      void this.lchoc.offsetWidth;
      this.lchoc.classList.add(CLASSNAME_UPDATE);
    }

    componentWillReceiveProps(nextProps) {
      this.oldProps = this.props;
      this.nextProps = nextProps;
    }

    componentWillUpdate() {
      console.time(`${this.name} componentWillUpdate => componentDidUpdate`)
    }

    componentDidUpdate() {
      this.toggleClass('lc-hoc--update');
      this.log();
    }

    log() {
      const newProps = JSON.stringify(this.nextProps),
            oldProps = JSON.stringify(this.oldProps);

      console.group(`${this.name} update`);
        console.count(`🌀 ${this.name}: render count`);

        if (this.state !== null) {
          console.groupCollapsed('⚡️ State');
            console.log(this.state);
          console.groupEnd();
        }

        if (newProps !== oldProps) {
          console.groupCollapsed('🏠 Props');
            console.log('⬇️ %cOld: ', 'color: gray');
            console.log(this.oldProps);
            console.log('⬇️ %cNew: ', 'color: teal');
            console.log(this.props);
          console.groupEnd();
        } else {
          if (Object.keys(this.props).length === 0 && this.props.constructor === Object) {
            console.log('❗️ %cProps are empty', 'color: red');
          } else {
            console.log('❗️ %cProps are unchanged', 'color: red');
            console.groupCollapsed('🏠 Props');
              console.log(this.props);
            console.groupEnd();
          }
        }
        console.groupCollapsed('🕗 Timings');
          console.timeEnd(`${this.name} componentWillUpdate => componentDidUpdate`);
          console.timeEnd(`${this.name} render => componentDidUpdate`);
        console.groupEnd();
      console.groupEnd();
    }

    render() {
      console.time(`${this.name} render => componentDidUpdate`);
      return(
        <div
          ref={(ref) => this.lchoc = ref}
          className={CLASSNAME}>
            {super.render()}
        </div>
      );
    }
  }
};

export default lcHOC;
