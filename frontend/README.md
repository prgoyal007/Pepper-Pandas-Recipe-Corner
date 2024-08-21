# Packages and Instructions needed for Frontend Initialization and Website Launch

1. Change your working directory to the frontend folder and run these commands:
yarn init -y 
yarn add axios
yarn add react
yarn add react-cookie
yarn add react-dom
yarn add react-router-dom
yarn add react-scripts
yarn add -D cross-env
yarn add react-draggable
yarn add react-google-recaptcha
yarn add dotenv
yarn add jspdf
yarn add react-to-print

2. Next, go to the package.json file and paste this after the curly bracket marking the end of the devDependencies portion
,
  "scripts": {
    "start": "set PORT=3001 && react-scripts start"
}

For mac users:
,
"scripts": {
    "start": "cross-env PORT=3001 react-scripts start"
}

3. Next, add these changes to .env file for frontend:
REACT_APP_RECAPTCHA_SITE_KEY=6Lcke7MpAAAAABG1o_UASWAJGCXLiYleXWqLasay

4. Finally, run yarn start while in the frontend folder and press y for default settings. The website should launch in your browser.
