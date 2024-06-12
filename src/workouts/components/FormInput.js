import { Form } from "react-bootstrap";
import '../styles/blocks/FormInput.scss';

export const FormInput = ({ placeholder, value, min, max, onChange }) => {
  return (
    <Form.Control
			className="FormInput"
			type="text"
      value={value}
			placeholder={placeholder}
      min={min}
      max={max}
      onChange={({ target: { value }}) => onChange(value)}
		/>
  );
};