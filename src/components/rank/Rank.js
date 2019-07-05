import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3 tc mh3'>
          {`${name}, your current entry count is...`}
      </div>
      <div className='white f1 tc'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;