import './App.css';
import { useState,useEffect } from 'react'
import React, { Component } from 'react';
const mixStyles = function(){
  var res = {};
  for (var i = 0; i < arguments.length; ++i) {
    if (arguments[i]) Object.assign(res, arguments[i]);
  }
  return res;
}
const Styles = {
  bgRed: {
    backgroundColor: "red",
  },
  bgBlue: {
    backgroundColor: "blue",
  },
  fontSize16: {
    fontSize: "16px",
  },
  fontSize20: {
    fontSize: "20px",
  },
  fontSize40:{
    fontSize: "40px",
  }
}
  
function App() {
  const [message, setMessage] = useState('');
  useEffect(() =>{
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  },[])
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{ message }</p>
      <a href="/nuko" style={mixStyles(Styles.fontSize40)}>英語</a>
      <a href="/login" style={mixStyles(Styles.fontSize40)}>ログイン画面</a>
      <a href="/React" >React</a>
    </div>
  );
}

export default App;