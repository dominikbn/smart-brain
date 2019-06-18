import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='flex justify-center'>
      <div className='mt2'>
        <img
          src={imageUrl}
          alt=''
          width='500px'
          height='auto'
        />
      </div>
    </div>
  );
}

export default FaceRecognition;