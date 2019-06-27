import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav className='flex justify-end'>
      <p className='f3 link dim black underline pa3 pointer'
        onClick={() => onRouteChange('signin')}
      >
        {isSignedIn ? 'Sign Out' : 'Sign In'}
      </p>
    </nav>
  );
}

export default Navigation;