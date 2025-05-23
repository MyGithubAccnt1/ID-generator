import { useState } from 'react';

const Button = ({ onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    background: 'linear-gradient(to right, black, #dc2626)',
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '3px 35px',
    borderRadius: '9999px',
    fontWeight: 'bold',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'background-color 1s ease-in, color 1s ease-in',
    outline: 'none',
  };

  const hoverStyle = {
    background: 'black',
    color: 'rgba(255, 255, 255, 1)',
  };

  const combinedStyle = isHovered
    ? { ...baseStyle, ...hoverStyle }
    : baseStyle;

  return (
    <button
      style={combinedStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

const ButtonWrapper = ({ captureDivsSeparately }) => {
  const wrapperStyle = {
    position: 'absolute',
    top: 0,
    marginTop: '1.25rem',
    width: '100dvw',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <div style={wrapperStyle}>
      <Button onClick={captureDivsSeparately}>DOWNLOAD</Button>
    </div>
  );
};

export default ButtonWrapper;