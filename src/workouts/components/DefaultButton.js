import { memo } from 'react';
import '../styles/blocks/DefaultButton.scss';

export const DefaultButton = memo(({ title, disabled, icon, onClick, style, ...otherProps }) => {
  return (
    <button
      type="button"
      className="DefaultButton" 
      disabled={disabled} 
      style={style}
      onClick={onClick}
      {...otherProps}
    >
      {icon && <img className="DefaultButton_icon" src={icon} alt="icon" />}
      {title}
    </button>
  );
});