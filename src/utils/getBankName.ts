export const getBankName = (transaction: any) => {
  try {
    if (!transaction?.payment_method) return "NA";

    const details = transaction?.details ? JSON.parse(transaction.details) : {};

    if (transaction.payment_method === "Net Banking") {
      return details?.netbanking?.netbanking_bank_name || "NA";
    }

    if (transaction.payment_method === "UPI") {
      return details?.upi?.upi_id || "NA";
    }

    if (transaction.payment_method === "Wallet") {
      return details?.app?.provider || "NA";
    }

    if (
      [
        "credit_card",
        "debit_Card",
        "credit_card_EMI",
        "debit_Card_EMI",
      ].includes(transaction.payment_method) &&
      transaction?.details
    ) {
      return details?.card?.card_bank_name || "NA";
    }

    return "NA";
  } catch (error) {
    return "NA";
  }
};
