import React from 'react';
import './CloseButton.css';

const CloseButton = ({ onClick }) => (
  <button
    className="CloseButton"
    onClick={onClick}
  >
    <i className="far fa-times-circle" />
    <i className="fas fa-times-circle" />
  </button>
);

export default CloseButton;