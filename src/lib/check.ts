
// Example usage
const response = {
    "r": [
      {
        "m": [
          {
              "t": "grammar",
            "o": 0,
            "l": 1,
            "m": "",
            "r": "8170565297646934214",
            "d": "",
            "c": "",
            "s": ["I"]
          },
          {
            "t": "grammar",
            "o": 6,
            "l": 17,
            "m": "",
            "r": "562239039712052720",
            "d": "",
            "c": "",
            "s": ["a sandwich yesterday."]
          }
        ]
      }
    ]
  };
  
  const text = "I ate a sandwich yesterday.";
  const highlights = response.r[0].m;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HighlightedText = ( text:any, highlights:any ) => {
      let result = '';
      let lastIndex = 0;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      highlights.forEach((highlight:any) => {
          const { o, l } = highlight;
          result += text.slice(lastIndex, o);
        result += `<span style="border: 2px solid yellow;">${text.slice(o, o + l)}</span>`;
        lastIndex = o + l;
    });
    
    result += text.slice(lastIndex);
    
    return result
  };
    HighlightedText(text,highlights)