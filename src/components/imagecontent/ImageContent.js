import React from 'react';

const ImageContent = ({ faceLocations, celebrities, imageUrl }) => {
  const showContent = (faceCount, isImageShown) => {
    if (!isImageShown) {
      return <p>No image.</p>
    }
    if (faceCount === 0) {
      return <p>No faces detected.</p>
    } else {
      return <p>{`Amount of detected faces: ${faceCount}`}</p>
    }
  }
  const showCelebrities = (celebrityList) => {
    if (celebrityList.length === 0) {
      return;
    }
    return celebrityList.map(celebrity => {
      const name = celebrity.name;
      const probability = (celebrity.value * 100).toFixed(2);
      return (
        <p className='f4 ttc' key={celebrity.id}>{`${name} (${probability}%)`}</p>
      );
    });
  }
  
  return (
    <div className='f5 tc ma3'>
      {showContent(faceLocations.length, imageUrl === '' ? false : true)}
      {showCelebrities(celebrities)}
    </div>
  );
}

export default ImageContent;