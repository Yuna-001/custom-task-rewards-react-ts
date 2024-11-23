export const numberFormatting: (num: number) => string = (num) => {
  const limit = 999999;

  if (num > limit) {
    return limit.toLocaleString() + "+";
  }

  return num.toLocaleString();
};

export const dateFormatting: (dateString: string) => string = (
  dateString: string,
) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
