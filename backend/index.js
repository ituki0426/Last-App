require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3001;
const { MongoClient } = require('mongodb');
const {OAuth2Client} = require('google-auth-library');
const { userInfo } = require('os');
const CLIENT_ID = '259909236756-1638u3a972nrhdncl9bqs44op1nfrpfc.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
const uri = "mongodb+srv://ituki:160426@cluster0.mqirw.mongodb.net/Node?retryWrites=true&w=majority";
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
const client1 = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client1.connect(err => {
  const collection = client1.db("Node").collection("yousers");
  console.log("Connected successfully to server");
  const documents = [
    { a: 1 },
    { a: 2 },
    { a: 3 }
  ];


  collection.insertMany(documents, (err, result) => {
    console.log('Inserted 3 documents into the collection');
    console.log(result);
    client1.close();
  })
});
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);   //　<--追加
app.get('/login',(req,res)=>{
  res.render("login.ejs")
})
app.get('/React',(req,res)=>{
  res.render("React-test.html")
})
app.post('/login', (req,res)=>{
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

})
var woen;
app.get('/profile', checkAuthenticated, (req, res)=>{
    woen = req.user;
    console.log(woen);
    let user = req.user;
    res.render('profile.ejs', {user});
})
app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })

}
app.get("/start",(req,res)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
})

app.get('/nuko',(req,res)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/nuko.html'));
})
app.get('/api', (req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
  res.json({ message: "Hello World!" });
});
app.get('*', (req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
});
app.listen(port, () => {
  console.log(`listening on *:${port}`);
})
// Google Auth
app.use(express.static(path.join(__dirname, '../frontend/build')));
// Middleware
app.get('/api', (req, res, next) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
    res.json({ message: "Hello World!" });
    // 何らかの処理
  });
