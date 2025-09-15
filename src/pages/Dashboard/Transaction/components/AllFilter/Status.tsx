import { handleCheckboxChange } from "../../Transaction";

function Status({ filter, setFilters }: any) {
  return (
    <div className="flex items-center gap-x-2">
      <>
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange("status", "success", setFilters)}
          id={"success"}
          name={"success"}
          checked={filter.success}
        />
        <label
          htmlFor={"success"}
          className={filter.success ? "text-black " : " text-gray-400"}
        >
          Success
        </label>
      </>
      <>
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange("status", "pending", setFilters)}
          id={"pending"}
          name={"pending"}
          checked={filter.pending}
        />
        <label
          htmlFor={"success"}
          className={filter.pending ? "text-black " : " text-gray-400"}
        >
          Pending
        </label>
      </>
      <>
        <input
          type="checkbox"
          onChange={() => {
            handleCheckboxChange("status", "failed", setFilters);
            handleCheckboxChange("status", "failure", setFilters);
          }}
          id={"failed"}
          name={"failed"}
          checked={filter.failed}
        />
        <label
          htmlFor={"success"}
          className={filter.failed ? "text-black " : " text-gray-400"}
        >
          Failed
        </label>
      </>
    </div>
  );
}

export default Status;
