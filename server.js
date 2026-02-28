const express = require('express');
require('./config/db' );
require('dotenv').config({path: './config/.env'})
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const msgsRoutes = require('./routes/msgs.routes');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
   res.status(200).send(res.locals.user._id);
})

//routes
app.use('/api/user',userRoutes);
app.use('/api/msgs',msgsRoutes);

app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`); 
})
