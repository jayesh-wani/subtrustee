export function getVendorAmount({ array, orderAmount }: any) {
  const res = array
    ?.map((info: any) => {
      const { percentage, amount } = info;
      let split_amount = amount;
      if (percentage) {
        split_amount = (orderAmount * percentage) / 100;
      }
      return split_amount;
    })
    ?.reduce((acc: any, curr: any) => acc + curr, 0);

  return res;
}
