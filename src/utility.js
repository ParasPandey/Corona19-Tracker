import numeral from "numeral";
export const sortFunc = (data) => {
  const collection = [...data];
  collection.sort((a, b) => b.cases - a.cases);
  return collection;
};
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
