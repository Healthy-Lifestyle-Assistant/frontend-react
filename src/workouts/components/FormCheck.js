import { Form } from "react-bootstrap";

export const FormCheck = ({ id, label, checked, onChange }) => {
  return (
    <Form.Check
      type="checkbox"
      id={id}
      label={label}
      checked={checked}
      onChange={onChange}
    />
  );
};