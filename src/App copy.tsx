// import axios from "axios";
// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { GeneralProvider } from "./contexts/GeneralContext";
// import translateText from "./services/translation"; // Adjust the import path to match your file structure

// function App() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [fix, setFix] = useState<any>("");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [res, setRes] = useState<any>("");
//   // Example usage
//   let text = "Me and my friend goes to the park last weekend. We was play frisbee and having a lot of fun. But suddenly, it starts to rain heavily. We runs for cover under a tree, but we was already wet. The rain was really cold, so we decides to go home. When we gets home, we takes hot showers and drinks hot chocolate to gets warm. Despite the rain, we was enjoyed the day.Me and my friend goes to the park last weekend. We was play frisbee and having a lot of fun. But suddenly, it starts to rain heavily. We runs for cover under a tree, but we was already wet. The rain was really cold, so we decides to go home. When we gets home, we takes hot showers and drinks hot chocolate to gets warm. Despite the rain, we was enjoyed the day."
//   async function test() {
//     try {
//       console.log("started");

//       const response = await sendRequest(text);
//       console.log(response);
//       const check = response.r?.[0].m;
//       if (check) {
//         setFix(response);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   useEffect(() => {
//     test();
//   }, []);
//   useEffect(() => {
    
//     if (fix) {
//       console.log(fix)
//       setRes(HighlightedText(text, fix.r[0].m));
//     }
//   },[fix])

//   return <>{<p>{res && res.map((r: unknown) => r)}</p>}</>;
// }

// export default App;

// const sendRequest = async (text: string) => {
//   const url = "http://localhost:3000/check-grammar";
//   const dataString = `{"text": "${text}"}

//   `;
//   const data = dataString;

//   const headers = {
//     Connection: "keep-alive",
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
//     "Content-Type": "application/json",
//   };

//   try {
//     const response = await axios.post(url, data, { headers });
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function HighlightedText(text: any, highlights: any) {
//   console.log(highlights);
//   //eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const result: any[] = [];
//   let lastIndex = 0;

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   highlights.forEach((highlight: any) => {
//     const { o, l } = highlight;
//     result.push(text.slice(lastIndex, o));
//     result.push(<span style={{ border: "2px solid yellow" }}>{text.slice(o, o + l)}</span>);
//     lastIndex = o + l;
//   });

//   result.push(text.slice(lastIndex));
//   console.log(result);
//   return result;
// }
