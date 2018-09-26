import React from 'react';

const styles = {
  display: 'inline-block'
};

const Emoji = ({ label, symbol }) => (
  <figure
    className="emoji"
    role="img"
    aria-label={label ? label : ''}
    aria-hidden={label ? 'false' : 'true'}
    style={styles}
  >
    {symbol}
  </figure>
);
export default Emoji;
