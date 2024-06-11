const FormatCurrency = (number: number) => {
  let formattedNumber = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedNumber;
};

export default FormatCurrency;
