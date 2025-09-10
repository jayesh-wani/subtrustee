import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../../../Qurries";
import { RowsPerPageSelect, Table } from "../../../../components/Table/Table";
import { amountFormat } from "../../../../utils/amountFormat";
import { getVendorAmount } from "../../../../utils/getVendorAmount";
import { Link } from "react-router-dom";
import { useTransactionFilters } from "../../../../hooks/useTransactionFilters";
import { useState } from "react";
import { getStartAndEndOfMonth } from "../../../../utils/getStartAndEndOfMonth";
import Select from "react-select";
import { HiMiniXMark } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { endOfDay, startOfDay } from "date-fns";

export default function Transaction() {
  const [urlFilters, setUrlFilters] = useTransactionFilters();
  const [currentPage, setCurrentPage] = useState<any>(
    Number(urlFilters.page) || 1,
  );
  const [itemsPerRow, setItemsPerRow] = useState<any>({
    name: Number(urlFilters.limit) || 10,
  });
  const { startDate, endDate } = getStartAndEndOfMonth();
  const { data, loading, error, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: {
      startDate: urlFilters.start_date ? urlFilters.start_date : startDate,
      endDate: urlFilters?.end_date ? urlFilters.end_date : endDate,
      page: currentPage.toString(),
      //status: status.toUpperCase(),
      //school_id: schoolId,
      limit: itemsPerRow.name.toString(),
    },
  });
  const [searchText, setSearchText] = useState<string>("");
  const [isCustomSearch, setIsCustomSearch] = useState(false);
  const [searchFilter, setSearchFilter] = useState<any>("");

  const [transactionReportData, settransactionReportData] = useState<any>([]);
  const [isDateRangeIsSelected, setIsDateRangeIsSelected] = useState(false);
  const [transactionTotal, setTransactionAmount] = useState(0);
  const [orderAmountTotal, setOrderAmountTotal] = useState(0);

  const [type, setType] = useState("");
  const [dateRange, setDateRange] = useState("");

  const [refetchLoading, setRefetchLoading] = useState(false);

  const [status, setStatus] = useState<any>(urlFilters.status || null);
  const [selectSchool, setSelectSchool] = useState<string | null>(
    urlFilters.school_name || null,
  );
  const [schoolId, setSchoolId] = useState<any>(urlFilters.school_id || null);

  const [transactionAmountDetails, setTransactionAmountDetails] =
    useState<any>(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [filters, setFilters] = useState<any>({
    paymentMode: {
      credit_card: urlFilters.payment_modes.split(",").includes("credit_card")
        ? true
        : false,
      credit_card_emi: urlFilters.payment_modes
        .split(",")
        .includes("credit_card_emi")
        ? true
        : false,
      upi: urlFilters.payment_modes.split(",").includes("upi") ? true : false,
      wallet: urlFilters.payment_modes.split(",").includes("wallet")
        ? true
        : false,
      pay_later: urlFilters.payment_modes.split(",").includes("pay_later")
        ? true
        : false,
      cardless_emi: urlFilters.payment_modes.split(",").includes("cardless_emi")
        ? true
        : false,
      net_banking: urlFilters.payment_modes.split(",").includes("net_banking")
        ? true
        : false,
      debit_card_emi: urlFilters.payment_modes
        .split(",")
        .includes("debit_card_emi")
        ? true
        : false,
      debit_card: urlFilters.payment_modes.split(",").includes("debit_card")
        ? true
        : false,
      na: urlFilters.payment_modes.split(",").includes("na") ? true : false,
      qr: urlFilters.payment_modes.split(",").includes("qr") ? true : false,
      vba: urlFilters.payment_modes.split(",").includes("vba") ? true : false,
      pos_credit_card: urlFilters.payment_modes
        .split(",")
        .includes("pos_credit_card")
        ? true
        : false,
      pos_debit_card: urlFilters.payment_modes
        .split(",")
        .includes("pos_debit_card")
        ? true
        : false,
      pos_qr: urlFilters.payment_modes.split(",").includes("pos_qr")
        ? true
        : false,
    },
    gateway: {
      EDVIRON_PG: urlFilters.gateway.split(",").includes("EDVIRON_PG")
        ? true
        : false,
      EDVIRON_EASEBUZZ: urlFilters.gateway
        .split(",")
        .includes("EDVIRON_EASEBUZZ")
        ? true
        : false,
      EDVIRON_RAZORPAY: urlFilters.gateway
        .split(",")
        .includes("EDVIRON_RAZORPAY")
        ? true
        : false,
    },
  });

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <Table
          heading={"History"}
          searchBox={
            <div className="w-full ">
              <div className="flex xl:!flex-row flex-col justify-between gap-2  w-full xl:items-center items-start mb-2">
                <div className="bg-[#EEF1F6] py-3 items-center flex  px-3 xl:max-w-md max-w-[34rem] w-full rounded-lg">
                  <input
                    className="text-xs pr-2 bg-transparent focus:outline-none w-full placeholder:font-normal"
                    type="text"
                    value={searchText}
                    placeholder=" Search(Order ID...)"
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                  {searchFilter !== "" && searchText.length > 3 && (
                    <HiMiniXMark
                      onClick={async () => {
                        setSearchFilter("");
                        setSearchText("");
                        refetch({
                          start_date: startDate,
                          end_date: endDate,
                        });
                      }}
                      className="text-[#1E1B59] cursor-pointer text-md mr-2 shrink-0"
                    />
                  )}
                  <Select
                    className="border-l-2 border-gray-400"
                    options={[
                      {
                        label: "By Order ID",
                        value: "custom_order_id",
                      },
                      { label: "By Edviron Order ID", value: "order_id" },
                      { label: "By Student Info", value: "student_info" },
                      {
                        label: "By UPI Transaction ID",
                        value: "bank_reference",
                      },
                      { label: "By UPI Id", value: "upi_id" },
                    ]}
                    isSearchable={false}
                    components={{
                      //DropdownIndicator: CustomDropdownIndicator,
                      IndicatorSeparator: () => null,
                    }}
                    onChange={(e: any) => {
                      setSearchFilter(e.value.toLowerCase());
                      setCurrentPage(1);
                    }}
                    placeholder={
                      <div className="text-[#1E1B59] -mt-1 capitalize text-[10px]">
                        {searchFilter === ""
                          ? "filter by"
                          : searchFilter
                                .toString()
                                .toLowerCase()
                                .replaceAll("_", " ") === "order id"
                            ? "Edviron Order ID"
                            : searchFilter
                                .toString()
                                .toLowerCase()
                                .replaceAll("_", " ")}
                      </div>
                    }
                    value={searchFilter}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "transparent",
                        height: "20px",
                        border: "none",
                        boxShadow: "none",
                        cursor: "pointer",
                        minHeight: "10px",
                        padding: "0px",
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        height: "20px",
                        width: "8rem",
                        padding: "0 8px",
                      }),
                      input: (provided) => ({
                        ...provided,
                        margin: "0",
                        padding: "0",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        margin: "0",
                        padding: "0",
                        lineHeight: "20px",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        lineHeight: "20px",
                      }),
                      indicatorsContainer: (provided) => ({
                        ...provided,
                        height: "20px",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        fontSize: "10px",
                        cursor: "pointer",
                      }),
                    }}
                  />

                  <div className="w-10 z-50 shrink-0 flex justify-center items-center">
                    {searchText.length > 3 && refetchLoading ? (
                      <AiOutlineLoading3Quarters className="text-xs animate-spin" />
                    ) : (
                      <IoSearchOutline
                        onClick={() => {
                          if (searchText.length > 3 && searchFilter !== "") {
                            setCurrentPage(1);
                            refetch({
                              isCustomSearch,
                              searchFilter: searchFilter,
                              searchParams: searchText,
                              start_date: isDateRangeIsSelected
                                ? formatDate(selectedRange.startDate)
                                : startDate,
                              end_date: isDateRangeIsSelected
                                ? formatDate(selectedRange.endDate)
                                : endDate,
                              status: status?.toUpperCase(),
                              school_id: schoolId === "" ? null : schoolId,
                              payment_modes: getPaymentMode(
                                filters.paymentMode,
                                type,
                              ),
                              isQrCode: getPaymentMode(
                                filters.paymentMode,
                                type,
                              )?.includes("qr"),
                              gateway: getPaymentMode(filters.gateway, type),
                            });
                          }
                        }}
                        className=" cursor-pointer text-edvion_black text-opacity-50 text-md "
                      />
                    )}
                  </div>
                </div>

                {/* <div className="flex justify-end items-center flex-1 w-full max-w-[34rem]">
                    <TransactionDateFilter
                      setType={setDateRange}
                      type={dateRange}
                      refetch={() => {
                        setCurrentPage(1);
                        setUrlFilters({
                          ...urlFilters,
                          start_date: formatDate(selectedRange.startDate),
                          end_date: formatDate(selectedRange.endDate),
                        });
                        refetchDataFetch({
                          start_date: formatDate(selectedRange.startDate),
                          end_date: formatDate(selectedRange.endDate),
                          status: status?.toUpperCase(),
                          school_id: schoolId === "" ? null : schoolId,
                          payment_modes: getPaymentMode(
                            filters.paymentMode,
                            type,
                          ),
                          isQrCode: getPaymentMode(
                            filters.paymentMode,
                            type,
                          )?.includes("qr"),
                          gateway: getPaymentMode(filters.gateway, type),
                        });
                      }}
                      selectedRange={selectedRange}
                      setSelectedRange={setSelectedRange}
                      setIsDateRangeIsSelected={setIsDateRangeIsSelected}
                    />
                    <div className="w-full">
                      <Select
                        className="font-normal m-0 p-2 capitalize"
                        options={[
                          { label: "SUCCESS", value: "SUCCESS" },
                          { label: "PENDING", value: "PENDING" },
                          { label: "FAILED", value: "FAILED" },
                          { label: "USER DROPPED", value: "USER_DROPPED" },
                        ].map((status: any) => {
                          return {
                            label: status.label?.toLowerCase(),
                            value: status.value?.toLowerCase(),
                          };
                        })}
                        components={{
                          DropdownIndicator: CustomDropdownIndicator,
                          IndicatorSeparator: () => null,
                        }}
                        onChange={(e: any) => {
                          setStatus(e.value);
                          setUrlFilters({
                            ...urlFilters,
                            status: e.value?.toUpperCase(),
                          });
                          setCurrentPage(1);
                          refetchDataFetch({
                            start_date: isDateRangeIsSelected
                              ? formatDate(selectedRange.startDate)
                              : startDate,
                            end_date: isDateRangeIsSelected
                              ? formatDate(selectedRange.endDate)
                              : endDate,
                            status: e.value?.toUpperCase(),
                            isCustomSearch: isCustomSearch,
                            searchFilter: searchFilter,
                            searchParams: searchText,
                            school_id: selectSchool === "" ? null : schoolId,
                            payment_modes: getPaymentMode(
                              filters.paymentMode,
                              type,
                            ),
                            isQrCode: getPaymentMode(
                              filters.paymentMode,
                              type,
                            )?.includes("qr"),
                            gateway: getPaymentMode(filters.gateway, type),
                          });
                        }}
                        placeholder={
                          <div className="text-[#1E1B59] text-xs">Status</div>
                        }
                        value={null}
                        styles={{
                          control: (provided: any) => ({
                            ...provided,
                            backgroundColor: "#F6F8FA",
                            border: "1px solid #1B163B",
                            borderRadius: "6px",

                            minHeight: "15px",
                            margin: "0px",
                            color: "#6687FF",
                          }),
                          valueContainer: (provided: any) => ({
                            ...provided,
                            padding: "0px",
                            paddingLeft: "0.5rem",
                          }),
                          input: (provided: any) => ({
                            ...provided,
                            backgroundColor: "transparent",
                            color: "#000",
                            "::placeholder": {
                              backgroundColor: "#YourDesiredColor",
                              opacity: 1,
                            },
                            placeholder: (provided: any) => ({
                              ...provided,
                              color: "red", // Set the color of the placeholder text
                            }),
                          }),
                        }}
                      />
                    </div>
                    <div className="w-full">
                      <MixFilter
                        setSelectSchool={setSelectSchool}
                        setSchoolId={setSchoolId}
                        paymentModes={Object.keys(filters.paymentMode).filter(
                          (key) => filters.paymentMode[key],
                        )}
                        gateway={Object.keys(filters.gateway).filter(
                          (key) => filters.gateway[key],
                        )}
                        setType={setType}
                        onCancel={() => {
                          setUrlFilters({
                            ...urlFilters,

                            payment_modes: null,

                            gateway: null,
                          });
                          refetchDataFetch({
                            start_date: isDateRangeIsSelected
                              ? formatDate(selectedRange.startDate)
                              : startDate,
                            end_date: isDateRangeIsSelected
                              ? formatDate(selectedRange.endDate)
                              : endDate,
                            status: status?.toUpperCase(),
                            isCustomSearch: isCustomSearch,
                            searchFilter: searchFilter,
                            searchParams: searchText,
                            school_id: selectSchool === "" ? null : schoolId,
                            isQrCode: getPaymentMode(
                              filters.paymentMode,
                              type,
                            )?.includes("qr"),
                            gateway: getPaymentMode(filters.gateway, type),
                          });
                        }}
                        onApply={() => {
                          setCurrentPage(1);
                          setUrlFilters({
                            ...urlFilters,
                            school_id: selectSchool === "" ? null : schoolId,
                            school_name: selectSchool,
                            payment_modes: getPaymentMode(
                              filters.paymentMode,
                              type,
                            ),

                            gateway: getPaymentMode(filters.gateway, type),
                          });
                          refetchDataFetch({
                            start_date: isDateRangeIsSelected
                              ? formatDate(selectedRange.startDate)
                              : startDate,
                            end_date: isDateRangeIsSelected
                              ? formatDate(selectedRange.endDate)
                              : endDate,
                            status: status?.toUpperCase(),

                            school_id: selectSchool === "" ? null : schoolId,
                            payment_modes: getPaymentMode(
                              filters.paymentMode,
                              type,
                            )?.includes("qr")
                              ? null
                              : getPaymentMode(filters.paymentMode, type),
                            isQrCode: getPaymentMode(
                              filters.paymentMode,
                              type,
                            )?.includes("qr"),
                            gateway: getPaymentMode(filters.gateway, type),
                          });
                        }}
                        filters={filters}
                        setFilters={setFilters}
                      />
                    </div>
                  </div> */}
              </div>
              <div>
                <RowsPerPageSelect
                  setItemsPerRow={(e: any) => {
                    setCurrentPage(1);
                    setItemsPerRow(e);
                    setUrlFilters({
                      ...urlFilters,
                      limit: e.name,
                    });
                  }}
                  itemsPerRow={itemsPerRow}
                  className=" justify-start"
                />
              </div>
              <div className="flex items-center">
                {(type !== "" ||
                  urlFilters.payment_modes !== "" ||
                  urlFilters.gateway !== "") && (
                  <div className=" text-sm m-2  max-w-fit ">
                    <button
                      onClick={async () => {
                        setType("");
                        setUrlFilters({
                          ...urlFilters,
                          payment_modes: null,
                          gateway: null,
                          page: 1,
                          limit: itemsPerRow.name,
                        });
                        setCurrentPage(1);

                        //   refetchDataFetch({
                        //     start_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.startDate)
                        //       : startDate,
                        //     end_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.endDate)
                        //       : endDate,
                        //     status: status?.toUpperCase(),
                        //     school_id: schoolId === "" ? null : schoolId,
                        //   });

                        setFilters({
                          paymentMode: {
                            credit_card: false,
                            credit_card_emi: false,
                            upi: false,
                            wallet: false,
                            pay_later: false,
                            cardless_emi: false,
                            net_banking: false,
                            debit_card_emi: false,
                            debit_card: false,
                            na: false,
                          },
                          gateway: {
                            EDVIRON_PG: false,
                            EDVIRON_EASEBUZZ: false,
                          },
                        });
                      }}
                      className="bg-[#6687FFCC] font-medium flex items-center rounded-lg text-white px-4 py-2 h-full w-full"
                    >
                      {urlFilters.payment_modes || urlFilters.gateway
                        ? "Custom Filter"
                        : type}{" "}
                      <HiMiniXMark className=" text-lg ml-1" />
                    </button>
                  </div>
                )}
                {(dateRange !== "" ||
                  urlFilters.end_date !== "" ||
                  urlFilters.start_date !== "") && (
                  <div className=" text-sm m-2  max-w-fit ">
                    <button
                      onClick={async () => {
                        setSelectedRange({
                          startDate: startOfDay(new Date()),
                          endDate: endOfDay(new Date()),
                          key: "selection",
                        });
                        //   refetchDataFetch({
                        //     start_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.startDate)
                        //       : startDate,
                        //     end_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.endDate)
                        //       : endDate,
                        //     status: status?.toUpperCase(),
                        //     isCustomSearch: isCustomSearch,
                        //     searchFilter: searchFilter,
                        //     searchParams: searchText,
                        //     school_id: selectSchool === "" ? null : schoolId,
                        //     payment_modes: getPaymentMode(
                        //       filters.paymentMode,
                        //       type,
                        //     ),
                        //     isQrCode: getPaymentMode(
                        //       filters.paymentMode,
                        //       type,
                        //     )?.includes("qr"),
                        //     gateway: getPaymentMode(filters.gateway, type),
                        //   });
                        setDateRange("");
                        setIsDateRangeIsSelected(false);
                        setUrlFilters({
                          ...urlFilters,
                          start_date: "",
                          end_date: "",
                          page: 1,
                          limit: itemsPerRow.name,
                        });
                        setCurrentPage(1);
                      }}
                      className="bg-[#6687FFCC] font-medium flex items-center rounded-lg text-white px-4 py-2 h-full w-full"
                    >
                      {urlFilters.end_date || urlFilters.start_date
                        ? "Custom Date"
                        : dateRange}{" "}
                      <HiMiniXMark className=" text-lg ml-1" />
                    </button>
                  </div>
                )}
                {selectSchool !== "" && selectSchool !== null && (
                  <div className=" text-sm m-2  max-w-fit ">
                    <button
                      onClick={() => {
                        setUrlFilters({
                          ...urlFilters,
                          school_id: null,
                          school_name: "",
                          page: 1,
                          limit: itemsPerRow.name,
                        });
                        //   refetchDataFetch({
                        //     start_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.startDate)
                        //       : startDate,
                        //     end_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.endDate)
                        //       : endDate,
                        //     status: status?.toUpperCase(),

                        //     payment_modes: getPaymentMode(
                        //       filters.paymentMode,
                        //       type,
                        //     ),
                        //     isQrCode: getPaymentMode(
                        //       filters.paymentMode,
                        //       type,
                        //     )?.includes("qr"),
                        //     gateway: getPaymentMode(filters.gateway, type),
                        //   });
                        setSelectSchool("");
                        setSchoolId(null);
                        setCurrentPage(1);
                      }}
                      className="bg-[#6687FFCC] font-medium flex items-center rounded-lg text-white px-4 py-2 h-full w-full"
                    >
                      {urlFilters?.school_name
                        ? urlFilters?.school_name
                        : selectSchool}{" "}
                      <HiMiniXMark className=" text-lg ml-1" />
                    </button>
                  </div>
                )}
                {status && (
                  <div className=" text-sm m-2  max-w-fit ">
                    <button
                      onClick={async () => {
                        //   refetchDataFetch({
                        //     start_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.startDate)
                        //       : startDate,
                        //     end_date: isDateRangeIsSelected
                        //       ? formatDate(selectedRange.endDate)
                        //       : endDate,
                        //     school_id: schoolId === "" ? null : schoolId,
                        //     payment_modes: getPaymentMode(
                        //       filters.paymentMode,
                        //       type,
                        //     ),
                        //     isQrCode: getPaymentMode(
                        //       filters.paymentMode,
                        //       type,
                        //     )?.includes("qr"),
                        //     gateway: getPaymentMode(filters.gateway, type),
                        //   });
                        setStatus(null);
                        setUrlFilters({
                          ...urlFilters,
                          status: null,
                          page: 1,
                          limit: itemsPerRow.name,
                        });
                        setCurrentPage(1);
                      }}
                      className="bg-[#6687FFCC] font-medium flex items-center rounded-lg text-white px-4 py-2 h-full w-full"
                    >
                      {urlFilters.status
                        ? urlFilters.status.replace(/_/g, " ").toLowerCase()
                        : status?.replace(/_/g, " ").toLowerCase()}{" "}
                      <HiMiniXMark className=" text-lg ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          }
          copyContent={[4, 5]}
          data={[
            [
              "Sr.No",
              "Institute Name",
              "Date & Time",
              "Order ID",
              "Edviron Order ID",
              "Order Amt",
              "Transaction Amt",
              "Payment Method",
              "Status",
              "Student Name",
              "Student ID",
              "Phone No.",
              "Vendor Amount",
              "Gateway",
              "Capture Status",
            ],
            ...(data?.getSubtrusteeTransactionReport?.transactionReport.map(
              (item: any, index: number) => [
                index + 1,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div className="truncate ">{item.school_name}</div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div className="truncate py-2">
                    {item.payment_time
                      ? new Date(item?.payment_time).toLocaleString("hi", {
                          timeZone: "Asia/Kolkata",
                        })
                      : new Date(item?.updatedAt).toLocaleString("hi", {
                          timeZone: "Asia/Kolkata",
                        })}
                  </div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div className="truncate ">
                    {item.custom_order_id ? item.custom_order_id : "N/A"}
                  </div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div className="truncate ">
                    {item.collect_id ? item.collect_id : "N/A"}
                  </div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>
                    ₹
                    {item.order_amount
                      ? Number(item?.order_amount.toFixed(2)).toLocaleString(
                          "hi-IN",
                        )
                      : 0}
                  </div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>
                    ₹
                    {item.transaction_amount
                      ? Number(
                          item?.transaction_amount.toFixed(2),
                        ).toLocaleString("hi-IN")
                      : 0}
                  </div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>{item.payment_method ? item.payment_method : "N/A"}</div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>{item.status ? item.status : "N/A"}</div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>{item.student_name ? item.student_name : "N/A"}</div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>{item.student_id ? item.student_id : "N/A"}</div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>{item.student_phone ? item.student_phone : "N/A"}</div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div>
                    {item.vendors_info?.length > 0
                      ? amountFormat(
                          getVendorAmount({
                            array: item?.vendors_info,
                            orderAmount: item?.order_amount,
                          }),
                        )
                      : "NA"}
                  </div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div className="truncate">
                    {item.gateway ? item.gateway : "N/A"}
                  </div>
                </Link>,
                <Link
                  to={`/payments/transaction-receipt/${item?.collect_id}?sid=${item?.school_id}&isVba=${item?.isVBAPaymentComplete}`}
                >
                  <div className="truncate ">
                    {item.capture_status ? item.capture_status : "N/A"}
                  </div>
                </Link>,
              ],
            ) || []),
          ]}
        />
      </div>
    </div>
  );
}
