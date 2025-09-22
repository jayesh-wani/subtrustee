export const getPaymentMode = (arr: any, type: string) => {
  if (type.length) {
    return Object.keys(arr).filter((key) => arr[key]).length > 0 && type
      ? Object.keys(arr).filter((key) => arr[key])
      : null;
  } else {
    return Object.keys(arr).filter((key) => arr[key]).length > 0
      ? Object.keys(arr).filter((key) => arr[key])
      : null;
  }
};
