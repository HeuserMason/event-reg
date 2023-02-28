const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/Events');
require('./models/Token');

mongoose.connect(keys.mongoURI);

const server = express();

server.use( //Middleware to allow react front-end to connect to this backend
    cors({ }) //origin: '*'
);

//Middleware parser before the data gets put into our post/get/put requests etc at the bottom routes
server.use(bodyParser.json());

// server.use(
//     cookieSession({
//         maxAge: 24 * 60 * 60 * 1000, // 24 hours
//         keys: [keys.cookieKey]
//     })
// );

// server.get('/', (req, res) => {
//     res.send('Hey! My server is working.');
// });

require('./routes/eventRoutes')(server);


if (process.env.NODE_ENV === 'production') {
  
    //Express will serve up production assets
    //like our main.js file, or main.css file!
    // If we can't find a route defined above, go and look inside the client build to serve that route instead
    // defined by: npm run build on client
    server.use(express.static('client/build'));
    server.use('*', express.static('client/build')); // Added this, not sure if needed

    // Express will serve up the index.html file
    // if it doesn't recognize the route from any previous call. In other words it didn't serve anything within the get via .send()
    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

    // app.get('*', function(req, res){
    //   res.sendFile(__dirname + '/index.html');
    // });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT);