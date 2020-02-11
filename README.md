# EarnUp Chat App

very basic chat app. It consists of one chat 'room'. You're able to post a message that will persist, allowing others to see. Right now, the other users need to manually refresh in order to see the updated messages. I wanted to add socket.io in order to handle real time updates to all clients, but ran out of time. Another option would have been to add server side events that pushed messages upon receiving new messages. Again, ran out of time and didn't want to focus heavily on the server side of things as this is a front end exercise.

I would have liked to create a DB for the users too. But then that would lead to needing authentication, etc. Again, keeping to frontend as much as possible.

currently the user name initially entered is saved to local storage. if you wish to use another user name, you'll have to delete the entry from local storage. I know this isn't ideal, but I feel it provides the smoothest user experience with as much as I was able to get done. At the very least, I would have liked to add a 'log out' link that deleted user from local storage, simulating logging out of a fully functioning app.

#### Available Scripts
- after you've cloned or somehow downloaded the repo, run yarn or npm install for dependancies.

      `$ yarn` || `$ npm i` (`$ npm install`)

- then you're set to run the application! Super simple to run the dev version.

      `$ yarn start` || `$ npm start`

- Seeds the DB, runs the app in the development mode, as well as the backend server for the DB and API.

- ~initial run of app requires seeding DB. to do this run:~

    ~`$ yarn seed` || `$ npm run seed`~

    *1*The seeding of the DB is now incorporated in the start script.**

- if the browser doesn't automatically open, go to [http://localhost:3000](http://localhost:3000) to view it in the browser.

- if you can't post a message, make sure the database was created. it'll live in the root of the project folder for ease of development.

(This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).)
