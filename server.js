const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');



//##load Models
require('./models/user.schema');
require('./models/user_wish.schema');
require('./models/party.schema');
require('./models/party_guests.schema');
require('./models/party_wish.schema');
require('./models/guests.schema');
require('./models/wish.schema');


//##pasport config 
require('./config/google')(passport);
require('./config/facebook')(passport);


//##Load Routes
const email = require('./routes/email');
const auth = require('./routes/auth');
const upload = require('./routes/upload');
const profile = require('./routes/profile');
const wish = require('./routes/wish');
const party = require('./routes/party');



// Load Keys
const keys = require('./config/keys');

//## map global promises

mongoose.Promise = global.Promise;

//connect to mongoose 

mongoose.connect(keys.google.mongoURI, {
    useMongoClient: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// set static folder
app.use(express.static(path.join(__dirname, 'client','build')));


//use routes
app.use('/auth',auth);
app.use('/email',email);
app.use('/upload',upload);
app.use('/profile',profile);
app.use('/wish',wish);
app.use('/party',party);

app.get('/*',(req, res) => {
    res.sendFile(path.join(__dirname,"client",'build','index.html'));
})
// app.get('/dashboard',(req, res) => {
//     res.send('dashboard')
// })



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});