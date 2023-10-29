/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

export const sendGrammarCheckRequest = async (text: string): Promise<string> => {
  const url = "http://localhost:3000/check-grammar";
  const dataString = `{"text": "${text}"}`;
  const data = dataString;

  const headers = {
    Connection: "keep-alive",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log(response);
    return response.data.r[0].m;
  } catch (error) {
    return "";
    console.error(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function highlightedText(text: any, highlights: any) {
  console.log(highlights);
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = [];
  let lastIndex = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  highlights.forEach((highlight: any) => {
    const { o, l } = highlight;
    result.push(text.slice(lastIndex, o));
    const element = <span className="bg-red-400 rounded-md p-1">{text.slice(o, o + l)}</span>;
    result.push(element);
    lastIndex = o + l;
  });

  result.push(text.slice(lastIndex));

  console.log(result);
  return result;
}
