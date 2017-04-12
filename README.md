# lcHOC - Lifecycle HOC
lcHOC is a HOC (higher order component) that helps you visualize and detect unnecessary rendering and performance issues in React.

Each time a component update, a green flash wraps the component (much like paint flashing in devtools) and rendering information is logged to the console.

#### Demo: https://build-ehksycopda.now.sh/

## Installation and usage
```es6
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
```
