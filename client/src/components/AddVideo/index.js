import React, { useState } from 'react';
import { getYoutubeIdFromFullLink } from './config';
import {
  EMPTY_ERROR_MESSAGE,
  EMPTY_URL_LINK
} from '../consts';

import './style.css';

const AddVideo = ({ handleAddVideo }) => {
  const [url, setUrl] = useState(EMPTY_URL_LINK);
  const [error, setError] = useState(EMPTY_ERROR_MESSAGE);

  const handleSubmit = (e) => {
      e.preventDefault();

      const pureVideoId = getYoutubeIdFromFullLink(url);
      if(!pureVideoId) setError('Invalid url'); 
      else handleAddVideo(pureVideoId);
      setUrl(EMPTY_URL_LINK);
  };

  return (
    <form onSubmit={handleSubmit} className="add-video">
      <input
        type="text"
        placeholder="Enter Youtube video URL"
        value={url}
        onFocus={() => setError(EMPTY_ERROR_MESSAGE)}
        onChange={(e) => setUrl(e.target.value)}
        minLength="11"
        required 
      />
      <button className="add-button">Add</button>
      {error ? <p className='error'>{error}</p> : EMPTY_ERROR_MESSAGE}
    </form>
);
};

export default AddVideo;