nt # Occtoo Technical Assignment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Solution related notes

The current solution is a simplified version of the general idea for the infinite loader.

What it currently does:
- fetches the data based on the url prop (which should fetch an object with the `results` key in the response, more on that later)
- allows the formatting of the data entries via `render` prop
- allows the configuration of the scroll threshold to fire the data fetching before user scrolls to the bottom

Problems with the implementation (and potential solutions):
- As many APIs might differ in terms of the response object, current solution only works with the chosen API (and anything that would fit the data structure of its response). As there were no requirements on what type of pagination to support, I decided to go with the above, however, to solve that issue a data transforming function could be added as a prop, or data could be transformed outside the component and passed as is (which would also extract the data fetching outside the component).
- Current implementation does everything in a single component which I'm not really a fan of; I'd consider splitting that into hooks and possibly smaller components for handling each task (data fetching, triggering callbacks on scroll etc.) separately.
- The component works one way only: it fetches the data when scrolled to the bottom as per requirements, however this is a certain performance bottleneck while being used with APIs that holds a lot of data. I'd advice to implement a state management system for the component (using context and `useReducer` hook for example) to be able to only render a portion of the fetched data within the component, traversing the data back when scrolled to the top.
- There are no tests. :(
- Styling is kind of lackluster.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
