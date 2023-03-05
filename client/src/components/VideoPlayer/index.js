import React from 'react';
import YouTube from 'react-youtube'; //https://www.npmjs.com/package/react-youtube
import config from './config';
import DefaultIcon from './DefaultIcon';
import './style.css';

const VideoPlayer = ({videoId,handlePlayNext}) => {

  const onPlayerReady = (event) => {
    event.target.playVideo();
  }

  return (
    <div className="video-player">
      {videoId !== "" ? <YouTube videoId={videoId} opts={config} onEnd={handlePlayNext} onReady={onPlayerReady} /> : <p className='default-view'><DefaultIcon/></p>}
  </div>
  );
};

export default VideoPlayer;
