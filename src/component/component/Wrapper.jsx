const Wrapper = ({
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
  onWheel,
  children,
}) => {
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave || onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onWheel={onWheel}
      style={{
        position: 'relative',
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100dvw',
        height: '100dvh',
        textAlign: 'center',     
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;