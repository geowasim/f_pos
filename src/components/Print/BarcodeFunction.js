import { Buffer } from "buffer";

export function getTLVForValue(tagNum, tagValue) {
  let tagBuf = Buffer.from([tagNum], "utf8");
  let tagValueLenBuf = Buffer.from([tagValue.length], "utf8");
  let tagValueBuf = Buffer.from(tagValue, "utf8");
  let bufsArray = [tagBuf, tagValueLenBuf, tagValueBuf];

  return Buffer.concat(bufsArray);
}
