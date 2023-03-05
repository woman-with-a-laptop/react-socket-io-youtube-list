import React, {useState, useEffect} from 'react';
import { getAndAddVideoDataToList } from './config';
import {
    EMPTY_VIDEOS_LIST,
    EMPTY_VIDEO_ID,
    EMPTY_ERROR_MESSAGE
} from '../consts';
import AddVideo from '../AddVideo';
import VideosList from '../VideosList';
import VideoPlayer from '../VideoPlayer';

import './style.css';

const HomePage = ({ socket }) => {
    const [error, setError] = useState(EMPTY_ERROR_MESSAGE);
    const [videos, setVideos] = useState(EMPTY_VIDEOS_LIST);
    const [videoId, setVideoId] = useState(EMPTY_VIDEO_ID);

    const handleAddVideo = (newId) => {
        setError(EMPTY_ERROR_MESSAGE);
        getAndAddVideoDataToList(newId,socket);
    }

    const getVideosList = (list, start = 0) => {
        return start ? [...list].splice(start,list.length) : list;
    }

    const handlePlayNext = () => {
        const nextId = 1;
        const nexVideo = videos[nextId];
        if(nexVideo) {
            setVideoId(nexVideo.videoId);
            const newList = getVideosList(videos, nextId);
            setVideos(newList);
            sessionStorage.setItem("videos", JSON.stringify(newList));
            const currentId = JSON.parse(sessionStorage.getItem("currentId")); 
            sessionStorage.setItem("currentId", JSON.stringify(currentId + nextId)); 
       } else {
            setVideoId(EMPTY_VIDEO_ID);
            setVideos(EMPTY_VIDEOS_LIST);
            sessionStorage.setItem("videos", JSON.stringify(EMPTY_VIDEOS_LIST));
            const currentId = JSON.parse(sessionStorage.getItem("currentId")); 
            sessionStorage.setItem("currentId", JSON.stringify(currentId + 1)); 
       }
    }

    useEffect(() => {
        // check videos from session storage
        const videos = JSON.parse(sessionStorage.getItem("videos"));   
        
        if(videos && videos.length > 0) {
            setVideos(videos); // get videos from storage
            setVideoId(videos[0].videoId);
        }
        else {
            socket.emit('getFirstTime'); // get videos from socket
        }
    }, []);


    useEffect(() => {

        // first time - save videos list and currentId to storage
        socket.on('messageResponse', (data) => {   
            const currentId = JSON.parse(sessionStorage.getItem("currentId")) || 0; 
            const newList = currentId ? getVideosList(data, currentId) : data;

            if(newList && newList.length > 0) {
                setVideoId(newList[0].videoId);
                setVideos(newList);
                sessionStorage.setItem("videos", JSON.stringify(newList));
                sessionStorage.setItem("currentId", JSON.stringify(currentId));
            }
        })

        socket.on('errorResponse', (res) => { 
            setError(res.error);
         });
        
    }, [socket]);

    return (
        <>
        <div className='menu'>
            <AddVideo handleAddVideo={handleAddVideo}/>
            {error ? <p className='error'>{error}</p> : EMPTY_ERROR_MESSAGE}
            <VideosList videos={videos}/>
        </div>
        <VideoPlayer videoId={videoId} handlePlayNext={handlePlayNext}/>
        </>
    );
};

export default HomePage;