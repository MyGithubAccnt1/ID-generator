import React from 'react';

const IDHole = () => {
  const style = {
    content: '',
    marginTop: '15px',           // mt-[15px]!
    backgroundColor: '#242424',  // bg-[#242424]
    color: '#242424',            // text-[#242424]
    borderRadius: '9999px',      // rounded-full
    width: '15%',                // w-[15%]
    height: '15px',              // h-[15px]
    marginLeft: 'auto',          // mx-auto (horizontal centering)
    marginRight: 'auto',
    textAlign: 'center',         // to center the dot inside
    lineHeight: '15px',          // vertically center the dot
    userSelect: 'none',          // optional: prevent text selection
  };

  return <div style={style}></div>;
};

export default IDHole;