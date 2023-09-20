# Sample application for Candid

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
It pulls the top 100 most starred repos from GitHub and allows for a modal to display recent commits.\
The whole thing is a little overbuilt, as requested. It's only one screen, but I built out routes and\
navigation. It's using Redux, which, again, is way too much for this application, since you could just\
keep the data in the state of the main page and pass it into the Modal component, but, like I said,\
it seemed like you wanted it overbuilt.

Tests are pretty minimal. I didn't want to spend a ridiculous time on this, so I didn't get into spoofing the Redux layer,\
which is what you'd want to do, since there's not much else to test. It's all set up to do that, but, like I said,\
I had already spent too much time on this thing.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
