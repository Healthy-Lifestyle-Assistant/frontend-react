import { memo } from 'react';
import '../styles/blocks/FormCheck.scss';

export const FormCheck = memo(({ label, icon, checked, onChange }) => {
  return (
    <label className="FormCheck">
      <input 
        className="FormCheck_checkbox" 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
      />
      <div className="FormCheck_container">
        <img className="FormCheck_icon" src={icon} alt="checkbox-icon" />
        <p className="FormCheck_title">{label}</p>
      </div>
    </label>
  );
});