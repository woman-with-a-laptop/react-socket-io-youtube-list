import React from 'react';
import { render, screen } from '@testing-library/react';
import VideosList from './index';

const videos = [
  {
    "id": 1,
    "title": "React Query: Fetch, cache, and update server data using queries and mutations | ReactJS Tutorial",
    "duration": "45:53",
    "videoId": "FvArk8-qgCk"
  }
]

describe('VideoList', () => {
  test('renders component', () => {
    const { container } = render(<VideosList videos={videos} />)
    expect(container.getElementsByClassName('video-list').length).toBe(1)
  });
});

