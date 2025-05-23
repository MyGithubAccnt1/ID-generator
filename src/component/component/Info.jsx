import { useState, useEffect } from 'react';

const Info = () => {
  const containerStyle = {
    position: 'absolute',
    width: '100dvw',
    display: 'none',
    justifyContent: 'space-between',
    paddingLeft: '75px',
    paddingRight: '75px',
  };

  const largeScreenStyle = {
    display: 'flex',
  };

  const xlJustifyAround = {
    justifyContent: 'space-around',
    paddingLeft: '0',
    paddingRight: '0',
  };

  const textStyle = {
    fontSize: '3rem',
    color: 'rgba(255, 255, 255, 0.3)',
    userSelect: 'none',
    whiteSpace: 'pre-line',
    lineHeight: 1.3,
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLg = windowWidth >= 1024;
  const isXl = windowWidth >= 1280;

  const combinedContainerStyle = {
    ...containerStyle,
    ...(isLg ? largeScreenStyle : {}),
    ...(isXl ? xlJustifyAround : {}),
  };

  return (
    <div style={combinedContainerStyle}>
      <p style={textStyle}>
        {'\u2190'}SWIPE{'\u2192'}
        <br />
        SCROLL
        <br />
        {'\u2190'}DRAG{'\u2192'}
      </p>
      <p style={textStyle}>
        {'\u2190'}SWIPE{'\u2192'}
        <br />
        SCROLL
        <br />
        {'\u2190'}DRAG{'\u2192'}
      </p>
    </div>
  );
};

export default Info;