import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceLocations }) => {
  const boundingBoxes = faceLocations.map((faceLocation, i) => {
    return (
      <div
        className='bounding-box absolute'
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
    <div className='flex justify-center ma3'>
      <div className='relative'>
        <img
          id='inputimage'
          className='db'
          src={imageUrl}
          alt=''
          width='700px'
        />
        {boundingBoxes}
      </div>
    </div>
  );
}

export default FaceRecognition;