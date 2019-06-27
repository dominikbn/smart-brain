import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
  return (
    <div className='mw8 center ph3-ns'>
      <p className='f3 tc'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='form cf pa4 br-pill-ns shadow-2'>
        <div className='fl w-100 w-70-m w-80-l pa2'>
          <input
            className='w-100 f4 ph3 pv2 bn br-pill'
            type='text'
            placeholder='http://...'
            onChange={onInputChange}
          />
        </div>
        <div className='fl w-100 w-30-m w-20-l pa2'>
          <button
            className='w-100 f4 b ph3 pv2 bn br-pill grow white bg-dark-gray'
            onClick={onImageSubmit}
          >
            {'Detect'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;