import React from 'react';
import './error-indicator.css';
import icon from './error.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error-icon" className="error-icon"/>
      <span className="boom">BOOM!</span>
      <span>
				Что-то сломалось
			</span>
      <span>
				Мы обязательно это починим
			</span>
      <span>
				<small>(и сломаем что-нибудь другое)</small>
			</span>
    </div>
  );
};

export default ErrorIndicator;