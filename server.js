// express is used to deploy the app on server/ localhost
// app.get- we are reuesting to root url and then creating fn as 2nd argument with request and respond, req contains info likewhat
// kinfd of req is coming in, any headers or arguments etc. , res is respond to http req, so that
// when a user request for url, express send something back to client using res.send to send data back
// app.listen used to make express listen to client req or bind application it to localhost port

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// TO INCLUDE REPEATED code in multiple web pages, like footer, we use partials to reuse the code
hbs.registerPartials(__dirname + '/views/partials');
// to include dynamic HTML, use handlebars i.e. hbs
app.set('view engine', 'hbs');

// this 3rd argument next is very imp as its call makes all the function, middleware, and helper fns end otherwise it will keep on running
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
  if(err) {
    console.log(err);
  }
});
next();
});

// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// });
// to include static webpage in your app, use app.use which is a middleware to extend the functionality of express
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('makeItCapitalize', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
//  res.send('<h1>Hello Express!</h1>');
// to send json back from server to client, crerate object
res.render('home.hbs', {
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to website!!!'
});
});

//2nd route
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

//3rd route
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to load the page'
  });
});

// 4th route
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project page',
    newMessage: 'new page created and deployed to test'
  });
});
app.listen(port, () => {
  console.log(`server is up and running on port: ${port}`);
});
