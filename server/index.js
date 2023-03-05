const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let videos = [];

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //Listens and logs the message to the console
    socket.on('addNewVideo', (data) => {
      // check if video not on the list
      const {videoId} = data;
      if(!videos.some(item => item.videoId === videoId)) {
        videos.push({...data, id:videos.length});
        socketIO.emit('messageResponse', videos);
      } else {
        socketIO.emit('errorResponse', {error: "Video is/was on the list allready"});
      }
    });

    //Listens when a new user joins the server
    socket.on('getFirstTime', () => {
        //Sends the list of users to the client
        if(videos.length > 0) {
            socketIO.emit('messageResponse', videos);
        }
    });
  
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});