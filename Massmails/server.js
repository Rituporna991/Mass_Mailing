const express = require('express');
const appRoute = require('./routes/route.js')
const path = require('path');
const ejsMate=require('ejs-mate');

const app = express();
const PORT = process.env.PORT || 5000;
app.engine('ejs',ejsMate);
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))
/** Routes */
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/sendmails',(req,res)=>{
  res.render('sendMail')
})
app.use('/api', appRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


