import * as React from 'react';
import { Select, SelectOption } from '@patternfly/react-core';
  
function StateSelection({ state, setState }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(state);

  const onSelect = (event: any, selection: any) => {
    setSelected(selection);
    setState(selection);
    setIsOpen(false);
  };

  const onToggle = (isExpanded: boolean) => {
    setIsOpen(isExpanded);
  };

  const options = [
    <SelectOption key="MA" value="Massachusetts" />,
    <SelectOption key="Other" value="Other" />
  ];

  return (
    <Select
      id="select"
      onToggle={onToggle}
      isOpen={isOpen}
      placeholderText="Select a value"
      aria-label="Select a value"
      selections={selected}
      onSelect={onSelect}
      isGrouped
    >
      {options}
    </Select>

  );
}

export default StateSelection