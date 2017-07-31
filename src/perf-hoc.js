import React from 'react';

const DEFAULTS = {
  log: {
    use: true,
    expanded: false,
    renderCount: true,
    state: true,
    props: true,
    timings: true
  },
  flash: true
},
  delay = 400;

const getName = W => W.displayName || W.name || 'Component';

const perfHOC = (W, params) => {
  if (!W.prototype.isReactComponent) {
    console.log('❗️ perf-hoc does not currently support stateless components');
    return W;
  }

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

    doFlash() {
      clearTimeout(this.timeout);
      Object.assign(this.flash.style, { opacity: 1 });

      this.timeout = setTimeout(() => {
        Object.assign(this.flash.style, { opacity: 0 });
      }, delay);
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
        this.doFlash();
      }

      if (this.settings.log.use) {
        this.log();
      }
    }

    log() {
      const newProps = JSON.stringify(this.nextProps),
        oldProps = JSON.stringify(this.oldProps),
        groupType = this.settings.log.expanded ? 'group' : 'groupCollapsed';

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
          if (
            Object.keys(this.props).length === 0 &&
            this.props.constructor === Object
          ) {
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
        console.timeEnd(
          `${this.name} componentWillUpdate => componentDidUpdate`
        );
        console.timeEnd(`${this.name} render => componentDidUpdate`);
        console.groupEnd();
      }
      console.groupEnd();
    }

    render() {
      if (this.settings.log.timings) {
        console.time(`${this.name} render => componentDidUpdate`);
      }

      return (
        <div
          ref={ref => (this.perfHOC = ref)}
          style={{
            position: 'relative'
          }}
        >
          <span
            ref={ref => (this.flash = ref)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: '2px solid green',
              backgroundColor: 'rgba(0, 255, 0, 0.25)',
              opacity: 0,
              transition: 'opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />
          {super.render()}
        </div>
      );
    }
  };
};

export default perfHOC;
