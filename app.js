const express = require('express')
const expresshbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./config/db')

const app = express();
const PORT = process.env.PORT || 3000;

// Test DB
db.authenticate()
.then(() => console.log('Connected to database........'))
.error((err) => console.log(err))

// Handlebars middleware
app.engine('handlebars', expresshbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({
    extended: false
}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Index route
app.get('/', (req, res) => res.render('index', {
    layout: 'landing'
}));

app.get('/check', (req,res) => {
    res.sendStatus(200);
});

//Gig routes
app.use('/gigs', require('./routes/gigs'));

app.listen(PORT, () => {
    console.log(`Server started on: ${PORT}`);
})