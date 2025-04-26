# Netflix GPT

Create React APP and setup tailwind css


npx create-react-app netflix-gpt
cd netflix-gpt

npm install -D tailwindcss@3 @tailwindcss/postcss postcss
npx tailwindcss init -p

postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

add to css sheet 
/* ./src/index.css */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";


tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

npm start



# Features

- Login Signup Page
    - Signin Signup page
    - redirect to Browse Page

- Browse (after authentication)
    - Header
    - Main Movie
        - Trailer in Background
        - Title and Description
        - Movie Suggestions
            - Movie List * N

-  NetfliGPT
    - search bar
    - movie suggestions



- Create React App
- Configure Tailwind
- Header
- Routing of App
- login Form
- Sign Up Form
- Form Validation  -- can use Formik
- Use Ref Hook
- Firebase Setup
- Deploying our app to firebase
- Create Sign Up user in firebase - https://firebase.google.com/docs/auth/web/password-auth#web
- Implement Sign In User API
- Redux npm install react-redux  npm install react-redux
- Created Redux Store with userSlice
- Implemented SignOut
- Update Profile
- Bug fix: Signup user displayName and profile picture update
- Bug fix: If the user is not logged in Redirect /browse to login page and vice-versa 
- Unsubscribe to the onAuthStateChanged Callback