# Packages and Instructions needed for Frontend Initialization and Website Launch

1. Change your working directory to the frontend folder and run these package installation commands:
- yarn init -y 
- yarn add axios, react, react-cookie, react-dom, react-router-dom, react-scripts, react-draggable, react-google-recaptcha, dotenv, jspdf, react-to-print
- yarn add -D cross-env

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
- yarn start -y
