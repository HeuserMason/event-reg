# Event Registration React App

Hey! This is an app meant to demonstrate a system where clients can purchase tickets to events created by an admin. A ticket is purchased using the **Stripe** flow and data about the clients such as name, email, and phone number are collected and stored using **MongoDB** as ```attendee``` subdocuments within an event.

# Setup
To start, let's install all the node modules for **Node.js**

Run ```npm install``` inside the root folder of **event-reg**

Then for React navigate to the **client** folder using ``cd client``

Finally again run ``npm install`` to finish installing the modules for both client and server.

Once everything is finished installing, run ``npm run dev`` inside the root folder **event-reg**

Front end is hosted at ``http://localhost:3000/``

Back end is hosted at ``http://localhost:5000/``

If you're hosting the app on a domain, make sure to include ``npm run heroku-postbuild`` on the build startup command line of the domain.

There is currently no front-end for creating an event, so I have the creation of a new event tied to ``http://localhost:5000/api/events/create-event``
