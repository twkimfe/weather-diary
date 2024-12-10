import "./Header.css";

const Header = ({
  title,
  leftChild,
  rightChild,
  onTitleClick,
  isCurrentMonth,
}) => {
  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div>
      <div
        className="header_center"
        onClick={onTitleClick || undefined}
        style={{
          cursor: onTitleClick && !isCurrentMonth ? "pointer" : "default",
        }}
      >
        {title}
      </div>
      <div className="header_right">{rightChild}</div>
    </header>
  );
};

export default Header;
