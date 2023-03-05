
import React from 'react';
import './style.css';

const VideosList = ({videos}) =>  (videos && videos.length) ? <ul className="video-list">
    {videos.map((video) =>  (
    <li key={video.id}>
        <div className="title">{video.title}</div>
        <div className="duration">{video.duration}</div>
    </li>
    ))}
</ul> : <></>

 
export default VideosList;