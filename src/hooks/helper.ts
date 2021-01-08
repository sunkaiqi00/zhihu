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
