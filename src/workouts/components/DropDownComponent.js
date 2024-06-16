import { memo, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import '../styles/blocks/DropDownComponent.scss';

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
    <Dropdown className="DropDownComponent" data-bs-theme="light">
      <Dropdown.Toggle className="DropDownComponent_toggle" variant="outline-secondary">
        {stateDropDown === variables[defaultValue] ? defaultTitle : ((names && names[stateDropDown]) || stateDropDown)}
      </Dropdown.Toggle>

      <Dropdown.Menu className="DropDownComponent_menu">
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