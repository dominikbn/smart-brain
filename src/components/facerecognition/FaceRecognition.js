import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceLocations }) => {
  const boundingBoxes = faceLocations.map((faceLocation, i) => {
    return (
      <div
        className='bounding-box'
        key={i}
        style={{
          top: faceLocation.top,
          left: faceLocation.left,
          bottom: faceLocation.bottom,
          right: faceLocation.right
        }}
      ></div>
    );
  });

  return (
    <div className='flex justify-center'>
      <div className='absolute mt3'>
        <img
          id='inputimage'
          src={imageUrl}
          alt=''
          width='600px'
          height='auto'
        />
        {boundingBoxes}
      </div>
    </div>
  );
}

export default FaceRecognition;