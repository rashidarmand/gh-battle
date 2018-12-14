import React from 'react';
import PropTypes from 'prop-types';

const ptString = PropTypes.string.isRequired;

export default function PlayerPreview ({ avatar, username, children }) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={ avatar }
          alt={`Avatar for ${ username }`} />
        <h2 className='usernme'>@{ username }</h2>
      </div>
      { children }
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: ptString,
  username: ptString
}