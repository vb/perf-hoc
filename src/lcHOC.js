import React from 'react';
import './lcHOC.css';

const CLASSNAME = 'lc-hoc',
  CLASSNAME_UPDATE = 'lc-hoc--update',
  DEFAULTS = {
    log: {
      use: true,
      expanded: false,
      renderCount: true,
      state: true,
      props: true,
      timings: true
    },
    flash: true
  };

const getName = (W) => W.displayName || W.name || 'Component';

const lcHOC = (W, params) => {
  return class HOC extends W {
    constructor() {
      super();
      this.name = getName(W);
      this.oldProps = {};

      this.settings = this.getSettings();
    }

    getSettings() {
      if (typeof params === 'undefined') {
        return DEFAULTS;
      }

      return Object.assign({}, DEFAULTS, params);
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
      if (this.settings.log.timings) {
        console.time(`${this.name} componentWillUpdate => componentDidUpdate`);
      }
    }

    componentDidUpdate() {
      if (this.settings.flash) {
        this.toggleClass('lc-hoc--update');
      }

      if (this.settings.log.use) {
        this.log();
      }
    }

    log() {
      const newProps = JSON.stringify(this.nextProps),
            oldProps = JSON.stringify(this.oldProps),
            groupType = this.settings.log.expanded ? 'group' : 'groupCollapsed'

      console[groupType](`${this.name} update`);

        if (this.settings.log.renderCount) {
          console.count(`🌀 ${this.name}: render count`);
        }

        if (this.state !== null && this.settings.log.state) {
          console[groupType]('⚡️ State');
            console.log(this.state);
          console.groupEnd();
        }

        if (this.settings.log.props) {
          if (newProps !== oldProps) {
            console[groupType]('🏠 Props');
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
              console[groupType]('🏠 Props');
                console.log(this.props);
              console.groupEnd();
            }
          }
        }

        if (this.settings.log.timings) {
          console[groupType]('🕗 Timings');
            console.timeEnd(`${this.name} componentWillUpdate => componentDidUpdate`);
            console.timeEnd(`${this.name} render => componentDidUpdate`);
          console.groupEnd();
        }
      console.groupEnd();
    }

    render() {
      if (this.settings.log.timings) {
        console.time(`${this.name} render => componentDidUpdate`);
      }

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
