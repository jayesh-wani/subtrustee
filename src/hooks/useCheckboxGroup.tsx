import { useState } from "react";

function useCheckboxGroup(initialValues: string[] = []) {
  const [selectedItems, setSelectedItems] = useState<string[]>(initialValues);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== value));
    }
  };

  return { selectedItems, handleCheckboxChange };
}

export default useCheckboxGroup;
