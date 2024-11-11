export const formatShorterize = (token: string) => {
    return `${token.slice(0, 5)}*****`;
  };
  
  export const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };
  