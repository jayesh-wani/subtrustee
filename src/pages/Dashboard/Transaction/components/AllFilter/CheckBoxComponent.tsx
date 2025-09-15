import React from "react";

function CheckBoxComponent({ handleChange, data, selectedItems }: any) {
  return (
    <>
      <input
        type="checkbox"
        onChange={handleChange}
        id={data?.id}
        name={data?.label}
        value={data?.id}
        checked={selectedItems.includes(data?.id)}
      />
      <label
        htmlFor={data?.id}
        className={
          selectedItems.includes(data?.id) ? "text-black " : " text-gray-400"
        }
      >
        {data?.label}
      </label>
    </>
  );
}

export default CheckBoxComponent;
