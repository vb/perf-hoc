# lcHOC - Lifecycle HOC
lcHOC is a HOC (higher order component) in React that visualize rendering and logs helpful information.

Enhance each component you want to study with lcHOC and every time that component updates, a green flash wraps the component (much like paint flashing in devtools) and debugging information is logged to the console.

#### Demo: https://build-ehksycopda.now.sh/

## Installation and usage
```es6
// Step 1: Install
npm install lc-hoc --save-dev;

// Step 2: Import
import lcHOC from 'lc-hoc';

// Step 3: Enhance
// by decorating
@lcHOC
class componentToStudy extends Component { ...

// or by wrapping
export default lcHOC(componentToStudy);
```
## Configuration
##  with [Webpack](https://webpack.github.io)
Don't forget to include `node_modules` or `lc-hoc` directory into your webpack configuration :
```
// CSS MODULES
{
  test: /\.css$/,
  loader: 'style-loader!css-loader?modules',
  include: /node_modules/ // or /lc-hoc/
}
```

## Customize
```es6
{
  log: {
    use: true,
    expanded: false,
    renderCount: true,
    state: true,
    props: true,
    timings: true
  },
  flash: true
}
```
You can customize lcHOC by overriding the default settings object above. Example below.

```es6
// Decorating with customization
@lcHOC({flash: false, log: {state: false}})

// Wrapping with customization
lcHOC(componentToStudy, {
  flash: false,
  log {
    state: false
  }
});
```
## Contribute

If you have ideas on how to improve this component feel free to request a feature or submit a pull request!
