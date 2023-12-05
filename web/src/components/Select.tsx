import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.select`
  background-color: #ffffff11;
  border: none;
  border-radius: 10px;
  padding: 0 10px;
  box-sizing: border-box;
  color: #ffffff;
  height: 50px;
  > option {
    background-color: #ffffff11;
    color: #1f1f1f;
  }
`;

interface Props {
  options: { value: string; label: string }[];
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

function Select(prop: Props) {
  const { options, value, onChange } = prop;
  return (
    <SelectWrapper name='selectedFruit' value={value} onChange={onChange}>
      {/* <option value='apple'>Apple</option>
      <option value='banana'>Banana</option>
      <option value='orange'>Orange</option> */}
      {options.map((option, index) => {
        return (
          <option key={index.toString()} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </SelectWrapper>
  );
}

export default Select;
