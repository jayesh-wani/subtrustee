import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import {
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  subDays,
} from "date-fns";
import { IoIosArrowDown } from "react-icons/io";
function DateFilter({
  type,
  setType,
  setRefundRequest,
  originalData,
  selectedRange,
  setSelectedRange,
}: any) {
  const [openDateRange, setOpenDateRange] = useState(false);
  const [isDateRangeIsOpen, setIsDateRangeIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpenDateRange(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const filtered = originalData
      .map((item: any) => {
        let eventDate = new Date(parseInt(item.createdAt));
        if (
          eventDate >= selectedRange.startDate &&
          eventDate <= selectedRange.endDate
        ) {
          return item;
        }
      })
      .filter((item: any) => item !== undefined);
    setFilteredData(filtered);
    if (type !== "") {
      setRefundRequest(filtered);
    }
  }, [selectedRange]);

  const handlePresetFilter = (type: any) => {
    let startDate, endDate;
    switch (type) {
      case "today":
        startDate = startOfDay(new Date());
        endDate = endOfDay(new Date());

        setType("Today");
        break;
      case "last7days":
        startDate = subDays(new Date(), 7);
        endDate = new Date();

        setType("Last 7 days");
        break;
      case "thisMonth":
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        setType("This Month");

        break;
      case "lastMonth":
        startDate = startOfMonth(subDays(new Date(), 30));
        endDate = endOfMonth(subDays(new Date(), 30));
        setType("Last Month");
        break;
      default:
        startDate = new Date();
        endDate = new Date();
        break;
    }

    setSelectedRange({
      startDate,
      endDate,
      key: "selection",
    });
  };
  const clearSelection = () => {
    setSelectedRange({
      startDate: startOfDay(new Date()),
      endDate: endOfDay(new Date()),
      key: "selection",
    });
    setRefundRequest(originalData);
    setType("");
  };

  return (
    <div className="relative w-full ">
      <button
        onClick={() => {
          setOpenDateRange(!openDateRange);
        }}
        className="focus:outline-none border border-edviron_black  hover:border-gray-300 transition-all duration-150 rounded-md py-2 w-full text-xs text-left flex items-center "
      >
        <span className="mr-auto pl-2">Date</span>
        <IoIosArrowDown className=" text-xs w-8 text-[#1E1B59]" />
      </button>
      {openDateRange && (
        <div
          ref={divRef}
          className="absolute text-sm bg-white xl:min-w-[26rem] min-w-[20rem] px-8 pt-2 pb-4 rounded-md shadow-lg z-10 flex flex-col"
        >
          <p className="p-2 text-center">Custom Range</p>
          <div className="flex flex-col xl:flex-row gap-x-4">
            <div className="text-sm shrink-0 grid grid-cols-2">
              <button
                className="p-2 cursor-pointer rounded-md text-left"
                onClick={() => handlePresetFilter("today")}
              >
                Today
              </button>
              <button
                className="p-2 cursor-pointer rounded-md text-left"
                onClick={() => handlePresetFilter("last7days")}
              >
                Last 7 Days
              </button>
              <button
                className="p-2 cursor-pointer rounded-md text-left"
                onClick={() => handlePresetFilter("thisMonth")}
              >
                This Month
              </button>
              <button
                className="p-2 cursor-pointer rounded-md text-left"
                onClick={() => handlePresetFilter("lastMonth")}
              >
                Last Month
              </button>
            </div>

            <DateRange
              ranges={[selectedRange]}
              onChange={(item: any) => {
                setSelectedRange(item.selection);
                setType("Custom Date");
              }}
              maxDate={new Date()}
            />
          </div>
          <div className="flex justify-end items-center">
            <button
              className="border px-4 py-2 rounded-lg mr-2 text-[#6687FFCC] text-bold"
              onClick={clearSelection}
            >
              Clear
            </button>
            {/* <button
              disabled={
                selectedRange.startDate.getDate() === new Date().getDate()
              }
              className=" disabled:bg-gray-100 disabled:text-gray-500  bg-edviron_black text-white px-4 py-2 rounded-lg "
              onClick={() => {
                setRefundRequest(filteredData);
                setType("Custom Date");
              }}
            >
              Apply
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default DateFilter;
