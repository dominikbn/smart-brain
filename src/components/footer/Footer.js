import React from 'react';

const Footer = ({ onRouteChange }) => {
  return (
    <footer className='flex justify-end black'>
      <p className='f5 underline dim ma3 pointer'
        onClick={() => onRouteChange('credits')}
      >
        Credits
      </p>
    </footer>
  );
}

export default Footer;