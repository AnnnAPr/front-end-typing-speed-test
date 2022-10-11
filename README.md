# Typing speed test

Typing speed test is a web app allows user to check how many correct words per minutes user can type using keyboard.

There are two branches: main and user. "Main" branch doesn't show user name, "user" branch does show user name for "best score" feature. Please refer to "user" branch as it has the main functionality. 

## Backend

https://github.com/AnnnAPr/back-end-typing-speed-test

## Tech stack

* Backend: Node JS and Express JS
* Frontend: React, Javascript
* Database: MongoDB Atlas
* Deployment: Heroku (backend)

## Dependencies:

* react-chartjs-2
* react-countdown-circle-timer
* react-use-gesture
* react-bootstrap
* bootstrap
* chart.js

## Installation

* Clone repository
* Install "yarn": yarn install
* Start server by running: yarn start

## Working with the React JS library:

* Sending data to nested components through props
* Receiving and using props within a component
* Initializing and using state within a component
* Passing callback functions to child components and use them to update state

## Goal

Goal is to create a typing speed test web app so user could check the number of correct words user types per minute using keyboard, to learn new things during creating full stack web app.

### User should be able:

* Restart test using "restart" button
* Get the best global score with bar charts info and name of person
* Get bar chart info for each reference text
* Save result and user name after test completed
* Can pet the orange cat and can move it all over the page.
* Press the key button and get the sound immitating the typing on the old typing machine
* On/OFF sound using button

### Main features:

* Current word for typing is bold and black color
* Correct word is a green color
* Incorrect word is a red color
* At the different range of time timer has different color of circle
* Pop up modals with bar charts could be closed by clicking "closed" button or by clicking outside of modal
* At the end of the test the modal component with result and picture will pop up.