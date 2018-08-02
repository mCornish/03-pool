import React from 'react';
import './Declaration.css';

const Declaration = ({ text, trigger = !!text }) => (
  <div className={`Declaration ${trigger ? 'Declaration--animate' : ''}`}>
      <p className="Declaration__text">{text} Wins!</p>
  </div>
);
export default Declaration;