import Card from "../../../components/Card/Card";

export default function Overview() {
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
    </div>
  );
}
