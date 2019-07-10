import React from 'react';

const Credits = ({ onRouteChange, isSignedIn }) => {
  const onBackButton = () => {
    isSignedIn ? onRouteChange('home') : onRouteChange('signin');
  }

  return (
    <div className='f5 h-100 flex flex-column justify-center items-center ma3'>
      <h1 className='f4 b'>Credits:</h1>
      <p className='tc'>
        Icons made by <a
          href="https://www.flaticon.com/authors/becris"
          title="Becris"
          target="_blank"
          rel="noopener noreferrer"
        >Becris
        </a> from <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          target="_blank"
          rel="noopener noreferrer"
        >www.flaticon.com
        </a> is licensed by <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          rel="noopener noreferrer"
        >CC 3.0 BY
        </a>
      </p>
      <p className='underline dim pointer'
        onClick={onBackButton}
      >
        {'← Back'}
      </p>
    </div>
  );
}

export default Credits;