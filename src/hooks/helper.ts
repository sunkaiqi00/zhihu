import { ColumnProps, CheckCondition } from "@/typeings/interface";

export function generateUrl(
  column: ColumnProps,
  width: number,
  height: number
) {
  if (column.avatar) {
    column.avatar.url += `?x-oss-process=image/resize,m_pad,h_${height},w_${width}`;
  } else {
    column.avatar = {
      url: require("@/assets/image/avatar.png")
    };
  }
}

type ErrorType = "format" | "size" | null;
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isVlidSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = "format";
  }
  if (!isVlidSize) {
    error = "size";
  }
  return {
    passed: isValidFormat && isVlidSize,
    error
  };
}

export interface TestProps {
  _id: string;
  name: string;
}

// const testData1: TestProps[] = [
//   { _id: "1", name: "1" },
//   { _id: "2", name: "2" }
// ];

// const testData2: { [key: string]: TestProps } = {
//   "1": { _id: "1", name: "1" },
//   "2": { _id: "2", name: "2" }
// };

// const arrToObj = <T extends { _id: string }>(arr: Array<T>) => {
//   return arr.reduce((pre, cur) => {
//     if (cur._id) {
//       return (pre[cur._id] = cur);
//     }
//   }, {} as { [key: string]: T });
// };
export const arrToObj = arr => {
  return arr.reduce((prev, cur) => {
    if (cur._id) {
      prev[cur._id] = cur;
    }
    return prev;
  }, {});
};
export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map(key => obj[key]);
};
