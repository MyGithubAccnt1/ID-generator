const IDBody = ({ id, children }) => {
  const baseStyle = {
    position: 'relative',                 // relative
    backgroundColor: 'white',             // bg-white
    marginLeft: '15px',                   // mx-[15px]! (left margin)
    marginRight: '15px',                  // mx-[15px]! (right margin)
    marginTop: '15px',                    // mt-[15px]!
    height: 'calc(100% - 60px)',          // h-[calc(100%-60px)]
    overflow: 'hidden',                   // overflow-hidden
    display: 'flex',                      // flex
    justifyContent: 'center',             // justify-center
  };

  return (
    <div id={id} style={baseStyle}>
      {children}
    </div>
  );
};

export default IDBody;