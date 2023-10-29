import axios from "axios";

export const translateText = async (text: string):Promise<string> => {
  const url = "https://translation2.paralink.com/do.asp";
  const data = `src=${encodeURIComponent(text)}&dir=iw%2Fen&provider=microsoft&ctrl=back`;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
      const response = await axios.post(url, data, { headers });
      const regex = /value="([^"]*)"/;
    const match = response.data.match(regex);
    if (match && match[1]) {
        const value = match[1]; // 'food'
        console.log(value);
        return value; // Or extract the required data from the response
    } else {
      return ""
        console.log('No match found');
      }
  } catch (error) {
    console.error(error);
    return "";
  }
};
