const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../frontend/build')));


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
