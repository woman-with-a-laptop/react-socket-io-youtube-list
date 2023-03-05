import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import AddVideo from './index';

const handleAddVideo = () => {}
//const validUrl = 'https://www.youtube.com/watch?v=FvArk8-qgCk';
//const invalidUrl = '11111111111';


describe('AddVideo', () => {
  test('renders section', () => {
    const { container } = render(<AddVideo handleAddVideo={handleAddVideo} />)
    expect(container.getElementsByClassName('add-video').length).toBe(1);
  });
  /*
  TODO:test form submition with in/valid URL
  */
});