import '../styles/blocks/FormCheck.scss';

export const FormCheck = ({ label, icon, checked, onChange }) => {
  return (
    <>
      {/* <Form.Check
        className="FormCheck"
        type="checkbox"
        id={id}
        label={label}
        checked={checked}
        onChange={onChange}
      /> */}
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
    </>
  );
};