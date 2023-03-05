
import React from 'react';
import HomePage from './components/HomePage';
import socketIO from 'socket.io-client';
import './App.css';

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <div className="app">
      <HomePage socket={socket}/>
    </div>
  );
}

export default App;
