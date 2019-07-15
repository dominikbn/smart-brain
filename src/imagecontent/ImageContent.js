import React from 'react';

const ImageContent = ({ faceLocations, imageUrl }) => {
  const showContent = (faceCount, isImageShown) => {
    if (!isImageShown) {
      return <p>No image.</p>
    }
    if (faceCount === 0) {
      return <p>No faces detected.</p>
    } else {
      return <p>{`There are ${faceCount} faces in the picture.`}</p>
    }
  }
  return (
    <div className='f5 tc ma3'>
      {showContent(faceLocations.length, imageUrl === '' ? false : true)}
    </div>
  );
}

export default ImageContent;