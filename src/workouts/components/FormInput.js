import { memo } from "react";
import { Form } from "react-bootstrap";
import '../styles/blocks/FormInput.scss';

export const FormInput = memo(({ placeholder, value, min, max, onChange }) => {
  const handleChange = ({ target: { value }}) => onChange(value);
  return (
    <Form.Control
			className="FormInput"
			type="text"
      value={value}
			placeholder={placeholder}
      min={min}
      max={max}
      onChange={handleChange}
		/>
  );
});