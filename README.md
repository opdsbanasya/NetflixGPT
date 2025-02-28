# NetflixGPT
A GPT based chatbot for Netflix

## CheckOut [NetflixGPT](https://netflixgpt-ec55f.web.app)

## Features
- Sign in / Sign up
    - form
    - redirect to Browse
- Browse
    - Header
        - Logo
        - GPT Search Button
        - Profile Icon
        - Sign Out
    - Main Section
        - Main Container
            - Trailer in background
            - Title & Description
        - Secondary Container
            - Movie List
                - Movie Cards
    - Movie Page
        - Movie Details
            - Movie Poster
            - Movie Title
            - Movie Description
            - Movie Cast
            - Movie Production Company
            - Movie Production Country
        - Movie Trailer
        - Footer
    - GPT
        - GPT Search Bar
        - GPT Movie Suggestions
    - Footer

## New Features
- MultiLanguage Support
- Voice assistant
- Disaplay movies according to user's preference and mood
- Mood detection by voice and face

## References
- [Face emotion detection](https://youtu.be/NG5Vi8zrqMM?feature=shared)
- [Voice emotion detection](https://youtu.be/v4wvbw5BwnA?feature=shared)

## STEPS
- Create a React App / Parcel App
- Set up tailwindcss
- Set up react-router
- Create Header
- Login Form
- Sign up Form
- Form Validation
- Set up Firebase
- Project deployment on Firebase
- Sign up / Sign in with Firebase
- Redux setup
- create userSlice
- dispatch an action
- navigate to browse
- subscribe to store
- bug fix1: fixing signup bug to loading image and display name
- subcribing onAuthStateChanged when component is mounted
- Shifting all constants into constant.js
- creating account on TMDB & getting API
- fetching now playing movies
- adding now playing movies to redux store
- creating hook to get movies
- Creating Movie Banner
- Creating Movie Row
- Adding all categories of movies
- Creating GPT slice
- Adding Gpt slice into store
- Creating GPT component and adding to browse
- Dispaching GPT action
- Creating GPTSearchBar and GPTMovieSuggestion
- Implementing MultiLanguage support✨
- Adding Groq based on Llama 3
- Initailize Llama 3 model
- Adding Llama Model into search button
- Fetching Movies data for movies that suggested by Llama
- adding movie names and data into store
- selecting movie from the list and displaying on the screen
- Adding Movie Details Page
- Updating Routes for gpt and movies page
- Creating Movie Page
- Building UI for Movie Page
- Creating useMovieDetail hook to fetch movie detail
- creating movieDetailSlice and adding it to store
- adding movie detail data into store
- creating useCast hook to fetch movie cast data
- adding it into movieDetailSlice
- Show all data on UI
- Creating movie Production Company and Production Country strips
- Adding Footer
- Adding icons
- Resplonsive Design