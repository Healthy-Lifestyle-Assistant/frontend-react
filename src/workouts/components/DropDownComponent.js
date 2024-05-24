import { memo, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

export const DropDownComponent = memo(({
  defaultTitle,
  searchParam, 
  variables, 
  names, 
  onChange, 
  defaultValue = 0,
}) => {
  const [stateDropDown, setStateDropDown] = useState(
    searchParam || variables[defaultValue]
  );

  const handleChange = (item) => {
    setStateDropDown(item);
    onChange(item);
  };

  useEffect(() => {
    setStateDropDown(searchParam || variables[defaultValue]);
  }, [defaultValue, searchParam, variables]);

  return (
    <>
    <Dropdown data-bs-theme="light">
      <Dropdown.Toggle variant="outline-secondary">
        {stateDropDown === variables[defaultValue] ? defaultTitle : ((names && names[stateDropDown]) || stateDropDown)}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {variables.map((item) => (
          <Dropdown.Item 
            onClick={() => handleChange(item)}
            active={item === stateDropDown}
            key={item}
          >
            {(names && names[item]) || item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </>
  );
});