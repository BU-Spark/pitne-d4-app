import React from "react";
import { Select, SelectOption } from "@patternfly/react-core";

function RegisteredSelection({ registered, setRegistered }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(registered);

  const onSelect = (event: any, selection: any) => {
    setSelected(selection);
    setRegistered(selection === "Yes" ? "true" : "false");
    setIsOpen(false);
  };

  const onToggle = (isExpanded: boolean) => {
    setIsOpen(isExpanded);
  };

  const options = [
    <SelectOption key="true" value="Yes" />,
    <SelectOption key="false" value="No" />,
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

export default RegisteredSelection;
