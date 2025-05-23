const IDWrapper = ({ children, style = {}, ...props }) => {

  const baseStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '0.375rem',
    width: '300px',
    height: '500px',
    ...style,
  };

  return (
    <div style={baseStyle} {...props}>
      {children}
    </div>
  );
};

export default IDWrapper;