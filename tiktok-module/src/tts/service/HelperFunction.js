const getCookieValue = (name) => {
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(name))
      ?.split('=')[1];
    return value ? decodeURIComponent(value) : '';
  };

const getCrrShopID = ()=>{
    return getCookieValue('crrShopName');
  }
const appKey = ()=> {
    return getCookieValue('crrAppKey'); // Get the appKey from the cookie
  }
  // Parse the shopData from JSON string to object
  const shopData = (shopID)=>{
    const shopData = getCookieValue('crrShopData'); // Get the shopData from the cookie
    return JSON.parse(shopData);
  }

  module.exports = {getCookieValue, getCrrShopID, appKey, shopData};