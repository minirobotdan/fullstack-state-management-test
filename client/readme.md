# ReactJS Boilerplate
This boilerplate is provided to allow us to ensure consistency of tools and libraries between ReactJS projects. Developers are not limited by the configuration provided, but the tools and libraries used has been tested and found to work well on previous projects.

## Webpack
The boilerplace includes a basic Webpack configuration: 

- A development server with sourcemap generation
- A TypeScript parser 
- Procedural generation of HTML files
- Correct handling of assets such as images
  
There are two NPM scripts to facilitate development:

- *npm run start* will initialise the development server and open a browser tab.
- *npm run build* will create a production build of the project in the */dist* folder.

## TypeScript
TypeScript should be used at all times througout the project. When adding a new dependency to the project, remember to also install it's type definition by running:

```
npm install --save-dev @types/dependencyname
```

It's worth noting not all packages will have type definitions (but nearly all mature ones do), and some may automatically include their definitions in the parent package.

### TypeScript & React
With regards to React Component development, I strongly encourage the creation of interface definitions for both props and state. The example component in this repository has an example of how to do this. Some key benefits of this approach:

- JSX will warn if you try and pass invalid props to a component in a template.
- Trying to cause a state mutation that does not match what the component expects will be picked up.
- Data flow through your component heirarchy is much easier to manage when you can inspect the interface definition of any received props, or while mapping props to state etc.

## Testing
The two key libraries used for testing in this project are Jest (a general purpose testing framework written by Facebook) and Enzyme (a React specific testing utility, created by the Airbnb team). Tests are easy to execute, simply run:

```
jest
```

Jest operates on the principle of snapshots- it captures snapshots of a given component when it runs, and compares them from run to run to ensure the DOM is consistent. If you make breaking changes to a component and wish to invalidate a snapshot, simple run 

```
jest -u
```

## General Javascript/TypeScript style & form
I won't provide an exhaustive style guide here, but I have pointed out some modern Javascript semantic flavour I'd like to maintain in all code, as it provides legibility, reduces cognitive overhead, avoids lengthy excerpts with little value, and generally improves the quality if life for developers on the project.

Examples found within include:

### Use of const and let to ensure immutability.
```js
let mutable;
const immutable = 'FOO';

mutable = 'BAR';
immutable = 'BAZ' // This will error, protecting from unexpected application state changes.
```

### Using shorthand arrow functions in simple callbacks and lambdas. Especially with type definitions if possible.
```js

// DON'T- LOTS OF COGNITIVE OVERHEAD, NO TYPE SAFETY
let archivedRecords = [];

for(let i = 0, l = records.length; i < l; i++) {
    if(records[i].archived === true) {
        archivedRecords.push(records[i])
    }
}

// DO- MUCH CLEANER, TYPE SAFE
const archivedRecords = records.map((record: Record) => record.archived);
```
  

### Object destructuring to drill into props and state
```js
// DON'T- NOT FUN TO READ
let foo = this.props.foo,
    bar = this.props.bar,
    baz = this.props.baz;

// DO- MUCH NEATER, MORE CONCISE
let { foo, bar, baz } = this.props;
```

### Automatic property naming is useful and easy to read
```js

// DON'T- WASTEFUL AND LESS AESTHETICALLY PLEASING
const a = 1, b = 2, c = 3;
const newObject = {
    a: a,
    b: b,
    c: c
}

// DO- MUCH TIDIER, CONCISE. CAN PROVIDE A TIGHTER CONTRACT BETWEEN FUNCTIONS TO KEEP VARIABLE NAMES CONSISTENT.
const a = 1, b = 2, c = 3;
const newObject = {
    a,
    b,
    c,
}
```

### Object cloning through destructuring, for example when creating a clone of an immutable state.
```js
// DON'T- UNSAFE, CLONE DEPTH IS A POTENTIAL ISSUE
const newState = {
    foo: this.state.foo,
    bar: this.state.bar,
    baz: this.state.baz
}

// DO (MAYBE)- BIT OLD SCHOOL, BUT SAFE.
const newState = Object.clone({}, this.state);

// DO- CLEAN, EASY TO READ WHEN MERGING MULTIPLE OBJECTS, ITEM PRECEDENCE IS EASY TO UNDERSTAND
const newState = {
    ...this.state
}
```

### Passing potentially null objects into a destructuring statement to safely merge transient values.
```js

    // DON'T- EASIER TO END UP WITH UNRELIABLE DATA STRUCTURES
    let suspiciousObject = null;

    const newState = {
        foo: this.state.foo,
        bar: this.state.bar,
        suspiciousObject: suspiciousObject
    }
    
    // newState.suspiciousObject will equal null

    // DO- THIS IS NULL SAFE

    const newState = {
        ...this.state
        ...suspiciousObject
    }

    // newState.suspiciousObject will not exist, easier to handle up front.
```

### Backtick string concatenation, especially in JSX templates
```js
const greeting = 'Hello', name = 'world';

// DON'T- HARD TO READ, PRONE TO TYPOS, WASTEFUL.
let sentence = '';
sentence += greeting;
sentence += ', ';
sentence += name;
sentence += '!';

// DO- MUCH MORE ELEGANT
const sentence = `${greeting}, ${name}!`;
```

### Use TypeScript enums where appropriate to ensure consistency between modules
```ts
// Exported so other modules can reuse the same values.
export enum ErrorMessages = {
    AccessDenied: 'Sorry, you do not have access to this resource',
    NotAuthentication: 'Sorry, you are not authenticated to view this resource
}
```

### Using public/private class methods to ringfence template functions in a component (TypeScript only).

This is purely a personal habit, but I find it useful. React components should only interact externally with a fixed API anyway, so the anatomy and security of the class methods are freed up to describe how it operates as a component.
```typescript

class MyComponent extends React.Component {


    // This method is only used by business logic internal to the code, so it's marked as private.
    private someInternalBusinessLogic(thing: Thing) {}

    // Marking this as public indicates it is a template method, used in the render method.
    public iterateOverSomeThings() {
        const { someThings } = this.props;

        // Do something with the things
        const result = someThings.map(this.someInternalBusinessLogic.bind(this));

        // Return as an array of templates
        return result.map(item => <div>item</div>);
    }

    render() {
        return({this.iterateOverSomeThings()})
    }
}

```