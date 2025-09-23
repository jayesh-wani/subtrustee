import { useQuery } from "@apollo/client";
import Card from "../../../components/Card/Card";
import LineGraph from "../../../components/Graph/LineGraph";
import { getStartAndEndOfMonth } from "../../../utils/getStartAndEndOfMonth";
import {
  getRecentTransactions,
  getSettlementAmount,
  sumTransactionAmountOfToday,
} from "./Helper/filterData";
import { useState } from "react";
import { GET_BATCH_TRANSACTION } from "../../../Qurries";

export default function Overview() {
  const { startDate, endDate, currentDate } = getStartAndEndOfMonth();

  const [year, setYear] = useState({
    name: new Date().getFullYear().toString(),
  });

  const {
    data: transactionReport,
    loading: transactionReportLoading,
    refetch,
  } = useQuery(GET_BATCH_TRANSACTION, {
    variables: {
      year: year?.name,
    },
  });

  // console.log(transactionReport, "transactionReport")

  // const { sum: sumOfTodaysTransactions, count: countOfTodaysTransactions } =
  //   sumTransactionAmountOfToday(
  //     recentTransaction?.getTransactionReport?.transactionReport,
  //   );
  // const settledAmount = getSettlementAmount(
  //   settlementData?.getSettlementReports,
  // );

  // const recentTransactions = getRecentTransactions(
  //   recentTransaction?.getTransactionReport?.transactionReport,
  // );

  return (
    <div className="mt-8">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-4">
        <Card amount={0} date={"Today"} description={"Transaction Amount"} />
        <Card amount={0} date={"Today"} description={"Number of transaction"} />

        <Card
          amount={10}
          date={"Till date"}
          description={"Total Registered Institutes"}
        />
        <Card
          amount={1245}
          date={"Most Recent"}
          description={"Settlement amount"}
        />
      </div>
      <div
        style={{ gridTemplateRows: "max-content" }}
        className="grid grid-cols-3  grid-rows-2 gap-4 mb-4"
      >
        <div className=" xl:col-span-2 order-1 col-span-3 ">
          <LineGraph
            dataArray={transactionReport?.getSubtrusteeBatchTransactionReport}
            setYear={setYear}
            year={year?.name}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
}
