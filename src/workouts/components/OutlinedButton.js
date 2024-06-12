import '../styles/blocks/OutlinedButton.scss';

export const OutlinedButton = ({ title, disabled, icon, onClick, style, ...otherProps }) => {
  return (
    <button
      type="button"
      className="OutlinedButton" 
      disabled={disabled} 
      style={style}
      onClick={onClick}
      {...otherProps}
    >
      {icon && <img className="OutlinedButton_icon" src={icon} alt="icon" />}
      {title}
    </button>
  );
};