const path = require('path');

const express = require('express');
const fileUpload = require('express-fileupload');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/*the urlencoded middleware worked with the default form encryption type:
application/x-www-form-urlencoded 
but it doesnt work with multipart/form-data
Express does not have an available middleware for it.
Use thirdparty package like express-fileupload
*/ 
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(fileUpload());




app.use(userRoutes);



db.connectToDatabase().then(function () {
  app.listen(3000);
});
