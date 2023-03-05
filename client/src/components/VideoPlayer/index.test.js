import React from 'react';
import { render } from '@testing-library/react';
import VideoPlayer from './index';

const videoId = 'aLQbVd-2tIo';
const handlePlayNext = () => {}

describe('VideoPlayer', () => {
  test('renders component', () => {
    const { container } = render(<VideoPlayer videoId={videoId} handlePlayNext={handlePlayNext}/>)
    expect(container.getElementsByClassName('video-player').length).toBe(1)
  });
  /*
  TODO:
  test with empty state
  */
});

