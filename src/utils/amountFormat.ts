const amountFormat = (amount: number): string => {
  if ((Math.floor(amount * 100) / 100).toLocaleString("hi-in").includes("-")) {
    return (
      "-₹" +
      (Math.floor(amount * 100) / 100).toLocaleString("hi-in").replace("-", "")
    );
  }
  return "₹" + (Math.floor(amount * 100) / 100).toLocaleString("hi-in");
};

export { amountFormat };
